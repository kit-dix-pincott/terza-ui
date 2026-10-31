# terza-ui

terza-ui is an Angular component library that takes a third way: fully styled
out of the box, yet themeable at every level through design tokens. _Terza_ is
Italian for "third".

> **Status:** initial scaffold. The library has no components yet beyond a
> generated placeholder, and the package has not been published to npm.

- **npm package:** [`terza-ui`](https://www.npmjs.com/package/terza-ui) (from the first release)
- **Documentation site:** `docs.terza.dev` (from the first release)
- **License:** [MIT](LICENSE)

## Conventions

|                           |                                                                  |
| ------------------------- | ---------------------------------------------------------------- |
| Component selector prefix | `tz` (for example `tz-button`)                                   |
| Design-token prefix       | `--tz-` (CSS custom properties; none are defined yet)            |
| Change detection          | zoneless; components are standalone                              |
| Angular                   | 22 (peer dependency)                                             |
| Accessibility             | WCAG 2.2 AA is enforced in CI; AAA is the target and is reported |

## Repository layout

```text
libs/ui          the terza-ui library (published to npm)
apps/docs        the documentation site (deployed to GitHub Pages)
apps/docs-e2e    Playwright end-to-end tests for the documentation site
docs/            documentation in markdown, indexed by llms.txt
tools/           repository scripts (accessibility levels, e2e reports)
.repo/           machine-readable repository manifest
```

[ARCHITECTURE.md](ARCHITECTURE.md) describes the structure, boundaries and
workflows in detail.

## Development

Requirements: Node 26 (see `.nvmrc`) and pnpm through corepack.

```sh
nvm use
corepack enable pnpm   # Node 26 no longer bundles corepack: npm install -g corepack first
pnpm install
pnpm exec playwright install chromium
```

| Command                 | What it does                                                           |
| ----------------------- | ---------------------------------------------------------------------- |
| `pnpm start`            | Serves the documentation site at http://localhost:4200                 |
| `pnpm storybook`        | Runs Storybook for the library at http://localhost:4400                |
| `pnpm lint`             | Lints every project (including TSDoc rules)                            |
| `pnpm test`             | Runs the unit tests with the 100% per-file coverage gate               |
| `pnpm build`            | Builds the library and the documentation site                          |
| `pnpm test-storybook`   | Builds Storybook and scans every story with axe                        |
| `pnpm e2e`              | Runs the documentation site's Playwright tests                         |
| `pnpm verify:packaging` | Builds the docs site against the built package and dry-runs `npm pack` |

## Documentation for tools and AI assistants

The `docs/` folder holds the library's documentation as plain markdown, and
[`llms.txt`](llms.txt) indexes every file in it. Markdown is the source of
truth; every component gets a page there.

## Contributing and releases

See [CONTRIBUTING.md](CONTRIBUTING.md). Changes are recorded in
[CHANGELOG.md](CHANGELOG.md).
