# Contributing to terza-ui

## Setup

See the Development section of the [README](README.md). Use the Node version
in `.nvmrc` and the pnpm version pinned in `package.json` (`packageManager`).

## Branches and pull requests

- `main` is the integration branch. `release` holds what has been released.
  Both are protected: changes arrive only through pull requests, and neither
  branch can be force-pushed or deleted.
- Work on a branch and open a pull request into `main`. Two checks must pass
  before it can merge: `verify-affected` (lint, unit tests, builds and the
  Storybook accessibility scan for the affected projects) and `e2e-affected`
  (critical e2e journeys on Chromium desktop and mobile).
- Pull requests merge with a merge commit; squash merging is allowed for
  small, single-purpose changes. Rebase merging is disabled.
- Every change that affects the package adds an entry under **Unreleased** in
  [CHANGELOG.md](CHANGELOG.md) in the same pull request.

## Standards

- **TypeScript** is strict. Every exported function, class, method, interface
  and type carries a TSDoc comment; `pnpm lint` enforces it.
- **Unit tests** use Vitest and live beside the code as `*.spec.ts`. Every
  file needs 100% statement, branch and function coverage. A line that truly
  cannot be covered gets a `/* v8 ignore */` comment with the reason. Tests
  that assert nothing meaningful (such as only `toBeTruthy()` on a created
  component) do not count.
- **Test names** describe behaviour in the present tense, without "should":
  `it('renders the label when one is given')`.
- **Component tests** render the real template and assert what a user sees
  in the DOM, using `data-testid` selectors.
- **Components** use the `tz` selector prefix and expose their theming as CSS
  custom properties with the `--tz-` prefix. Each new component adds a
  Storybook story, a documentation page in `docs/` (listed in `llms.txt`), a
  docs-site example and a conformance entry in
  `apps/docs-e2e/journeys/components/` in the same pull request.
- **Accessibility:** WCAG 2.2 AA is the gate and AAA is the target; both levels
  are set in `.repo/manifest.json`. Gate-level axe violations fail CI, in
  Storybook and in the e2e tests. Target-level violations are written to
  `reports/a11y/` as findings.
- **End-to-end tests** live in `apps/docs-e2e`. Every journey is listed in
  `apps/docs-e2e/journeys/*.md` with a stable id, and its spec carries that id
  as a tag (`{ tag: '@docs.landing' }`). Specs import `test` and `expect` from
  `apps/docs-e2e/fixtures`, use role-based locators and web-first assertions,
  and never sleep. A test that passes only on retry is a flake to fix, not a
  pass.

## Releasing

1. Move the **Unreleased** entries in `CHANGELOG.md` under a new
   `## [x.y.z] - YYYY-MM-DD` heading.
2. Bump the package version:
   `pnpm --dir libs/ui version x.y.z --no-git-tag-version`.
3. Merge those changes into `main`, then open a pull request from `main` into
   `release` and merge it.
4. Tag the release commit on `release` with `vx.y.z` and push the tag. The
   release workflow checks that the tag is on `release`, matches the package
   version and has a changelog entry, then publishes the package to npm and
   deploys the documentation site.

Hotfixes branch from `release`, merge back into `release` through a pull
request, are tagged there, and are then merged into `main`.

The documentation site can be redeployed without a release by running the
release workflow manually on the `release` branch.
