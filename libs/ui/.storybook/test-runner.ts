import type { TestRunnerConfig } from '@storybook/test-runner';
import { checkA11y, injectAxe } from 'axe-playwright';
import { axeTagsFor, readConformance } from '../../../tools/a11y/conformance';

// The test-storybook target runs from the repository root.
const { gate } = readConformance(process.cwd());

/**
 * Scans every story with axe after it renders. Violations at the manifest's
 * gate level fail the run.
 */
const config: TestRunnerConfig = {
  async preVisit(page) {
    await injectAxe(page);
  },
  async postVisit(page) {
    await checkA11y(page, '#storybook-root', {
      axeOptions: { runOnly: { type: 'tag', values: axeTagsFor(gate) } },
      detailedReport: true,
      detailedReportOptions: { html: true },
    });
  },
};

export default config;
