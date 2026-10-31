import { defineConfig, devices } from '@playwright/test';
import { nxE2EPreset } from '@nx/playwright/preset';
import { getReadyUrl, workspaceRoot } from '@nx/devkit';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const isCI = !!process.env['CI'];
// E2E_TIER=pr is the pull-request tier: Chromium desktop and mobile only,
// critical journeys only. Unset (local runs, main, nightly) runs everything.
const isPrTier = process.env['E2E_TIER'] === 'pr';
const baseURL = process.env['BASE_URL'] || getReadyUrl('http://localhost:4200');

/**
 * Collects the ids of the journeys marked `[critical]` in `journeys/**\/*.md`.
 * Specs carry the id as a tag, so the PR tier greps for these tags.
 *
 * @param dir - The journeys directory.
 * @returns The critical journey ids.
 */
function criticalJourneyIds(dir: string): string[] {
  return readdirSync(dir, { recursive: true, encoding: 'utf8' })
    .filter((file) => file.endsWith('.md'))
    .flatMap((file) =>
      [
        ...readFileSync(join(dir, file), 'utf8').matchAll(
          /^## ([a-z0-9.-]+) \[critical\b/gm,
        ),
      ].map((match) => match[1]),
    );
}

/**
 * Builds a grep that matches exactly the given journey tags.
 *
 * @param ids - Journey ids, without the leading `@`.
 * @returns A pattern matching `@<id>` for any of the ids; matches nothing when empty.
 */
function tagGrep(ids: string[]): RegExp {
  if (ids.length === 0) {
    return /$^/;
  }
  const escaped = ids.map((id) => id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  return new RegExp(`@(?:${escaped.join('|')})(?![\\w.-])`);
}

const allProjects = [
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  { name: 'mobile-chromium', use: { ...devices['Pixel 7'] } },
  { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  { name: 'webkit', use: { ...devices['Desktop Safari'] } },
];
const prProjects = new Set(['chromium', 'mobile-chromium']);

export default defineConfig({
  ...nxE2EPreset(import.meta.dirname, { testDir: './specs' }),
  // Results stay next to the project so CI can upload them from a fixed path.
  outputDir: './test-results',
  // Pass-on-retry is flake: it is logged by `pnpm e2e:flake-log`, never accepted.
  retries: isCI ? 2 : 0,
  reporter: [
    ['list'],
    ['html', { outputFolder: './playwright-report', open: 'never' }],
    [
      'json',
      { outputFile: join(workspaceRoot, 'reports', 'e2e', 'results.json') },
    ],
  ],
  grep: isPrTier
    ? tagGrep(criticalJourneyIds(join(import.meta.dirname, 'journeys')))
    : undefined,
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  webServer: {
    // CI serves the optimised build (with source maps for coverage); local
    // runs reuse or start the dev server.
    command: isCI
      ? 'pnpm exec nx run docs:serve-static:e2e'
      : 'pnpm exec nx run docs:serve',
    url: getReadyUrl('http://localhost:4200'),
    reuseExistingServer: !isCI,
    cwd: workspaceRoot,
  },
  projects: isPrTier
    ? allProjects.filter((p) => prProjects.has(p.name))
    : allProjects,
});
