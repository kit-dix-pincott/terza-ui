// Writes reports/e2e/flake-log.json: every e2e test that failed and then
// passed on retry. Flake is debt; this log is reviewed, never ignored.
// Reads the Playwright JSON report; exits 0 with an empty log when no report
// exists (for example when the e2e step was skipped).
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const reportsDir = join(process.cwd(), 'reports', 'e2e');
const resultsFile = join(reportsDir, 'results.json');
const logFile = join(reportsDir, 'flake-log.json');

/**
 * Collects flaky tests from a Playwright JSON report suite tree.
 *
 * @param suite - A suite node of the Playwright JSON report.
 * @param titles - Titles of the enclosing suites.
 * @returns One entry per flaky test run.
 */
function collectFlaky(suite, titles = []) {
  const path = suite.title ? [...titles, suite.title] : titles;
  const fromSpecs = (suite.specs ?? []).flatMap((spec) =>
    spec.tests
      .filter((test) => test.status === 'flaky')
      .map((test) => ({
        title: [...path, spec.title].join(' › '),
        file: spec.file,
        tags: spec.tags,
        project: test.projectName,
        attempts: test.results.map((result) => result.status),
      })),
  );
  return [
    ...fromSpecs,
    ...(suite.suites ?? []).flatMap((child) => collectFlaky(child, path)),
  ];
}

mkdirSync(reportsDir, { recursive: true });
const flaky = existsSync(resultsFile)
  ? JSON.parse(readFileSync(resultsFile, 'utf8')).suites.flatMap((suite) =>
      collectFlaky(suite),
    )
  : [];
writeFileSync(logFile, JSON.stringify(flaky, null, 2) + '\n');
console.log(
  existsSync(resultsFile)
    ? `flake log: ${flaky.length} flaky test run(s) -> ${logFile}`
    : `flake log: no Playwright report at ${resultsFile}; wrote an empty log`,
);
