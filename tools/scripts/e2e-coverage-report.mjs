// Builds the merged coverage report: unit coverage (Vitest, Istanbul JSON per
// project under coverage/<project>/) plus e2e coverage (raw V8 from the
// Chromium runs under coverage/e2e/raw/). Output: coverage/merged/.
// This report shows what no test layer exercises. It is feedback only and
// has no threshold; the unit coverage gate is enforced by the unit tests.
import { CoverageReport } from 'monocart-coverage-reports';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { basename, isAbsolute, join, resolve } from 'node:path';

const root = process.cwd();
const coverageDir = join(root, 'coverage');
const rawDir = join(coverageDir, 'e2e', 'raw');
// The e2e web server serves the docs `e2e` build configuration.
const servedDir = join(root, 'dist', 'e2e', 'docs', 'browser');
// Only this repo's TypeScript sources; MCR applies `sourcePath` (absolute)
// before `sourceFilter`, so the match is not anchored.
const isSource = (path) => /(^|\/)(apps|libs)\/[^/]+\/src\/.+\.ts$/.test(path);

/**
 * Lists the files in a directory, or nothing when it does not exist.
 *
 * @param dir - Directory to list.
 * @returns Absolute paths of the files in `dir`.
 */
function filesIn(dir) {
  return existsSync(dir)
    ? readdirSync(dir)
        .map((name) => join(dir, name))
        .filter((path) => statSync(path).isFile())
    : [];
}

/**
 * Converts the raw V8 e2e entries to Istanbul data via their source maps.
 *
 * @returns Istanbul coverage keyed by absolute source path, or null when no e2e data exists.
 */
async function e2eIstanbul() {
  const rawFiles = filesIn(rawDir).filter((path) => path.endsWith('.json'));
  if (rawFiles.length === 0) {
    return null;
  }
  const e2e = new CoverageReport({
    name: 'e2e',
    outputDir: join(coverageDir, 'e2e', 'report'),
    reports: ['json'],
    logging: 'error',
    entryFilter: (entry) => entry.url.endsWith('.js'),
    sourceFilter: (path) => isSource(path),
    sourcePath: (path) => resolve(root, path),
  });
  for (const file of rawFiles) {
    const entries = JSON.parse(readFileSync(file, 'utf8')).flatMap((entry) => {
      const map = join(
        servedDir,
        `${basename(new URL(entry.url).pathname)}.map`,
      );
      return existsSync(map)
        ? [{ ...entry, sourceMap: JSON.parse(readFileSync(map, 'utf8')) }]
        : [];
    });
    await e2e.add(entries);
  }
  await e2e.generate();
  const out = join(coverageDir, 'e2e', 'report', 'coverage-final.json');
  const data = existsSync(out) ? JSON.parse(readFileSync(out, 'utf8')) : {};
  return Object.keys(data).length > 0 ? data : null;
}

const merged = new CoverageReport({
  name: 'Unit + e2e coverage',
  outputDir: join(coverageDir, 'merged'),
  reports: ['html', 'lcovonly', 'text-summary'],
  logging: 'error',
});

let inputs = 0;
for (const project of readdirSync(
  existsSync(coverageDir) ? coverageDir : root,
)) {
  const unit = join(coverageDir, project, 'coverage-final.json');
  if (project !== 'e2e' && project !== 'merged' && existsSync(unit)) {
    const data = JSON.parse(readFileSync(unit, 'utf8'));
    for (const key of Object.keys(data)) {
      if (!isAbsolute(key)) {
        throw new Error(`unexpected relative path in ${unit}: ${key}`);
      }
    }
    await merged.add(data);
    inputs += 1;
  }
}
const e2e = await e2eIstanbul();
if (e2e) {
  await merged.add(e2e);
  inputs += 1;
}

if (inputs === 0) {
  console.log(
    'coverage report: no unit or e2e coverage found; nothing to merge',
  );
} else {
  await merged.generate();
  console.log(
    `coverage report: merged ${inputs} input(s) -> ${join(coverageDir, 'merged')}`,
  );
}
