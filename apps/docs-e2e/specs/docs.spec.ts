import { expect, test } from '../fixtures';

test.describe('docs.landing', () => {
  test(
    'shows the library name and the pitch on the landing page',
    { tag: '@docs.landing' },
    async ({ checkedPage }) => {
      const { page } = checkedPage;

      await checkedPage.goto('/');

      await expect(
        page.getByRole('heading', { level: 1, name: 'terza-ui' }),
      ).toBeVisible();
      await expect(page.getByText('takes a third way')).toBeVisible();
    },
  );
});
