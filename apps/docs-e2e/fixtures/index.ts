import AxeBuilder from '@axe-core/playwright';
import { workspaceRoot } from '@nx/devkit';
import {
  test as base,
  expect,
  type Locator,
  type Page,
} from '@playwright/test';
import { appendFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  axeTagsFor,
  readConformance,
  targetOnlyTags,
} from '../../../tools/a11y/conformance';

const conformance = readConformance(workspaceRoot);
const findingsDir = join(workspaceRoot, 'reports', 'a11y');
const coverageDir = join(workspaceRoot, 'coverage', 'e2e', 'raw');

/** Options for {@link CheckedPage.goto}. */
export interface CheckedGotoOptions {
  /**
   * The element whose visibility means the page has rendered and is ready to
   * scan.
   *
   * @defaultValue the page's level-1 heading (every docs page has exactly one)
   */
  readyWhen?: Locator;
}

/** Options for {@link CheckedPage.axeExceptions}. */
export interface AxeExceptionOptions {
  /** CSS selector limiting the exception to one region of the page. */
  within?: string;
}

/** A page that runs an axe scan on every navigation. */
export interface CheckedPage {
  /** The underlying Playwright page, for locators and actions. */
  readonly page: Page;
  /**
   * Navigates, waits for the page to render, then scans it.
   *
   * @param url - Path relative to the base URL.
   * @param options - How to tell that the page is ready.
   */
  goto(url: string, options?: CheckedGotoOptions): Promise<void>;
  /** Scans the page in its current state, e.g. after an overlay opens. */
  scan(): Promise<void>;
  /**
   * Excludes axe rules from this test's scans. Each call needs a comment at
   * the call site giving the reason and the tracking issue.
   *
   * @param rules - axe rule ids to skip.
   * @param options - Optional region the exception is limited to.
   */
  axeExceptions(rules: string[], options?: AxeExceptionOptions): void;
}

/** The house fixtures. Specs import `test` and `expect` from here only. */
interface HouseFixtures {
  /** Page wrapper that scans for accessibility violations on navigation. */
  checkedPage: CheckedPage;
  /** Automatic V8 coverage collection on Chromium (feedback only, never gated). */
  coverage: void;
}

export const test = base.extend<HouseFixtures>({
  checkedPage: async ({ page }, use, testInfo) => {
    const exceptions: { rules: string[]; within?: string }[] = [];

    const scan = async (): Promise<void> => {
      const globalRules = exceptions
        .filter((e) => !e.within)
        .flatMap((e) => e.rules);
      const regional = exceptions.filter((e) => e.within);

      let gateScan = new AxeBuilder({ page })
        .withTags(axeTagsFor(conformance.gate))
        .disableRules(globalRules);
      for (const exception of regional) {
        gateScan = gateScan.exclude(exception.within as string);
      }
      const violations = [...(await gateScan.analyze()).violations];
      for (const exception of regional) {
        const regionScan = await new AxeBuilder({ page })
          .withTags(axeTagsFor(conformance.gate))
          .include(exception.within as string)
          .disableRules([...globalRules, ...exception.rules])
          .analyze();
        violations.push(...regionScan.violations);
      }

      const extraTags = targetOnlyTags(conformance);
      if (extraTags.length > 0) {
        const findings = (
          await new AxeBuilder({ page })
            .withTags(extraTags)
            .disableRules(globalRules)
            .analyze()
        ).violations;
        if (findings.length > 0) {
          mkdirSync(findingsDir, { recursive: true });
          appendFileSync(
            join(findingsDir, 'target-findings.jsonl'),
            JSON.stringify({
              test: testInfo.titlePath,
              url: page.url(),
              findings,
            }) + '\n',
          );
        }
      }

      expect(
        violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          nodes: v.nodes.map((n) => n.target),
        })),
        `axe violations at WCAG ${conformance.gate} on ${page.url()}`,
      ).toEqual([]);
    };

    await use({
      page,
      async goto(url, options) {
        await page.goto(url);
        await expect(
          options?.readyWhen ?? page.getByRole('heading', { level: 1 }),
        ).toBeVisible();
        await scan();
      },
      scan,
      axeExceptions(rules, options) {
        exceptions.push({ rules, within: options?.within });
      },
    });
  },

  coverage: [
    async ({ page, browserName }, use, testInfo) => {
      const collect = browserName === 'chromium';
      if (collect) {
        await page.coverage.startJSCoverage({ resetOnNavigation: false });
      }
      await use();
      if (collect) {
        const entries = await page.coverage.stopJSCoverage();
        mkdirSync(coverageDir, { recursive: true });
        writeFileSync(
          join(
            coverageDir,
            `${testInfo.testId}-${testInfo.project.name}-${testInfo.retry}.json`,
          ),
          JSON.stringify(entries),
        );
      }
    },
    { auto: true },
  ],
});

export { expect };
