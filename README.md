# terza-ui

terza-ui is an Angular component library of finished, accessible components
that take on the look of your design system through a documented style API and
themes written in plain CSS.

> **Status: early development.** The repository holds the build, test
> and release pipeline and one placeholder component. It has no real components
> yet, and the package has not been published to npm. Work starts with phase 1
> of the [roadmap](#roadmap). Each section below says what exists today and
> what is planned.

- **npm package:** [`terza-ui`](https://www.npmjs.com/package/terza-ui) (from the first release)
- **Documentation site:** `docs.terza.dev` (from the first release)
- **License:** [MIT](LICENSE)

## Why terza-ui

### Your design system, in plain CSS

Each component exposes a small, documented set of CSS variables: its style
API. A theme is a plain CSS file that sets design tokens. Together they let a
team give the components the look of its own design system without forking
the library, without writing component styles, and without Sass, Tailwind or
JavaScript configuration. This is the design that phase 1 builds; see
[How theming works](#how-theming-works).

### Accessibility as a build gate

WCAG 2.2 AA is checked by the pipeline, not by a review at the end. Every
Storybook story is scanned with axe, as is each page the end-to-end tests
visit, and a violation fails the build. This gate is in the repository today; see
[Accessibility](#accessibility).

### Built for AI-assisted teams

The documentation is plain markdown, indexed by [`llms.txt`](llms.txt), and
every component must ship a documentation page. The planned style API adds to
this: it gives an AI assistant a short, documented list of variables for each
component, instead of leaving it to guess at internal selectors. See
[Built for AI-assisted teams](#built-for-ai-assisted-teams).

## The name

_Terza_ is Italian for "third". The name refers to a third answer to the
question of who writes the styling code and whose look the result is.

Angular Material gives you finished components in Google's Material Design,
customised through its Sass theming API. PrimeNG gives you finished components
with a choice of built-in presets, customised through design tokens in its
configuration; it also offers an unstyled mode. In their styled modes, both
start from the library's own look. Headless libraries such as Angular Aria
give you behaviour and accessibility, and leave the styling to you.
spartan/ui pairs headless primitives with styled components that you copy
into your project and then own.

|                                | Who writes the styling code | Whose look it is                       |
| ------------------------------ | --------------------------- | -------------------------------------- |
| Styled libraries               | The library                 | The library's design, which you adjust |
| Headless and copy-in libraries | You                         | Yours                                  |
| terza-ui                       | The library                 | Yours                                  |

terza-ui starts from a skeleton theme that carries no design language. The
default look is one theme, and a team's own design system is another.

There is a limit. A component's markup, structure and behaviour are fixed. A
design system that needs a component to have a different structure is outside
what a theme can do.

## How theming works

> **Planned.** This is the intended design. The first component, built in
> phase 1, will confirm it, and the names shown here may change.

```css
/* 1. The component declares its style API on :host. */
:host {
  --padding: var(--tz-button-padding);
  --padding-top: var(--padding);
  --padding-right: var(--padding);
  --padding-bottom: var(--padding);
  --padding-left: var(--padding);
}

button {
  padding: var(--padding-top) var(--padding-right) var(--padding-bottom) var(--padding-left);
}

/* 2. A theme sets the design tokens the components read. */
:root {
  --tz-button-padding: 0.5rem;
}

/* 3. A view overrides one instance through the style API. */
.toolbar tz-button {
  --padding: 0.25rem;
}
```

- **The component style API** is the set of CSS variables a component declares
  on its host element. It is curated: it lists the properties that are meant
  to be changed.
- **A theme** sets the `--tz-` design tokens that the components and their
  style APIs read. Changing a token in a theme changes every component that
  reads it.
- **An instance override** sets a style API variable from the styles of the
  view that uses the component, and affects only that instance.

Three themes are planned:

| Theme         | Purpose                                                                                                                                             |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Skeleton      | A working theme that sets only the required tokens, with plain values and comments on how to style each part. Copy it to start a theme of your own. |
| Default       | The library's standard look.                                                                                                                        |
| High contrast | A look for people with low vision.                                                                                                                  |

The library's own styles are written in SCSS. What it publishes is plain CSS:
nobody needs Sass to write a theme or to use a component.

## Accessibility

**In the repository today:**

- WCAG 2.2 AA is the gate. Every Storybook story is scanned with axe, the
  documentation site's end-to-end tests scan each page they visit, and a
  violation at that level fails CI.
- WCAG 2.2 AAA is the target. Findings at that level are reported, not
  enforced.
- Both levels are set in one place, [`.repo/manifest.json`](.repo/manifest.json).

**Planned, as components and themes arrive:**

- Every component meets WCAG 2.2 AA for its structure, keyboard use and
  screen reader behaviour, in every theme. Fixed component structure is what
  makes this possible.
- The default and high-contrast themes are both tested against AA in CI.
- A team that writes its own theme is responsible for that theme's colour
  contrast and focus styles. The skeleton theme's comments will say which
  tokens affect accessibility.
- A theme accessibility checker, planned for phase 7, will test any theme
  against the contrast and focus rules.

## Built for AI-assisted teams

terza-ui is a UI library that AI coding assistants can use accurately. That
serves two groups: teams that build with the library, and contributors who
work on it.

**In the repository today:**

- [`llms.txt`](llms.txt) indexes every page in [`docs/`](docs). Markdown is
  the source of truth for the documentation.
- A component is not complete without a documentation page listed in
  `llms.txt`. [CONTRIBUTING.md](CONTRIBUTING.md) makes this a rule.
- Every exported class, function, method, interface and type carries a TSDoc
  comment, enforced by lint.
- The repository describes itself in files an assistant can read:
  [ARCHITECTURE.md](ARCHITECTURE.md) for structure, [CONTEXT.md](CONTEXT.md)
  for vocabulary, [`docs/adr/`](docs/adr) for decisions and
  [`.repo/manifest.json`](.repo/manifest.json) for the toolchain.

**Planned:**

| For                     | What                                                                                  | Phase |
| ----------------------- | ------------------------------------------------------------------------------------- | ----- |
| Contributors            | An `AGENTS.md` with the repository's working rules for assistants                     | 1     |
| Contributors            | A CI check that `llms.txt` lists every page in `docs/`                                | 1     |
| Teams using the library | The documentation shipped inside the npm package, so it matches the installed version | 7     |
| Teams using the library | An MCP server that serves component documentation, style APIs and design tokens       | 7     |

## How it is built

These gates are in the repository today and run in CI.

- **Unit tests:** every source file needs 100% statement, branch and function
  coverage.
- **Accessibility:** the axe scans described above.
- **End-to-end tests:** Playwright runs the documentation site's journeys on
  Chromium desktop and mobile for every pull request, and on Chromium,
  Firefox and WebKit nightly and on every push to `main`.
- **Packaging:** the documentation site is built against the built package,
  not the source, so a packaging defect fails CI before a release.
- **API documentation:** lint fails on an export without a TSDoc comment.
- **Boundaries:** lint enforces which project may import which.
- **Decisions:** design decisions are recorded in [`docs/adr/`](docs/adr), and
  the project's vocabulary in [CONTEXT.md](CONTEXT.md).

[ARCHITECTURE.md](ARCHITECTURE.md) describes the structure, boundaries and
workflows in detail.

## Roadmap

No phase has a date. Each phase is set out in more detail in
[docs/roadmap.md](docs/roadmap.md).

| Phase | Theme                   | Headline contents                                                                 |
| ----- | ----------------------- | --------------------------------------------------------------------------------- |
| 1     | Foundations (next)      | Design tokens, the three themes, Icon, Button, Link, `AGENTS.md`                  |
| 2     | Form basics             | Form field, Text Input, Textarea, Checkbox, Radio, Switch                         |
| 3     | Feedback and containers | Alert, Badge, Spinner, Progress Bar, Card, Panel, Chip, Tag                       |
| 4     | Overlays                | Tooltip, Popover, Dialog, Drawer, Toast, Dropdown Menu                            |
| 5     | Selection               | Listbox, Select, Combobox, Dropdown Button, Split Button                          |
| 6     | Navigation              | Tabs, Breadcrumb, Navbar, Sidebar Nav, Pagination, Steps                          |
| 7     | Tooling and 1.0         | Documentation in the npm package, MCP server, theme accessibility checker, 1.0    |
| Later | Not yet ordered         | Date and time, tables, lists and trees, rich content, data visualisation and more |

## Conventions

|                           |                                                                  |
| ------------------------- | ---------------------------------------------------------------- |
| Component selector prefix | `tz` (for example `tz-button`)                                   |
| Design-token prefix       | `--tz-` (CSS custom properties; none are defined yet)            |
| Change detection          | zoneless; components are standalone                              |
| Angular                   | 22 (peer dependency)                                             |
| Accessibility             | WCAG 2.2 AA is enforced in CI; AAA is the target and is reported |

## Development

Requirements: Node 26 (see `.nvmrc`) and pnpm through corepack.

```sh
nvm use
corepack enable pnpm   # Node 26 no longer bundles corepack: npm install -g corepack first
pnpm install
pnpm exec playwright install chromium
```

| Command          | What it does                                             |
| ---------------- | -------------------------------------------------------- |
| `pnpm start`     | Serves the documentation site at http://localhost:4200   |
| `pnpm storybook` | Runs Storybook for the library at http://localhost:4400  |
| `pnpm lint`      | Lints every project (including TSDoc rules)              |
| `pnpm test`      | Runs the unit tests with the 100% per-file coverage gate |
| `pnpm build`     | Builds the library and the documentation site            |

The remaining commands, for the Storybook accessibility scan, the end-to-end
tests and the packaging gate, are listed under Workflows in
[ARCHITECTURE.md](ARCHITECTURE.md).

## Contributing

The project is in its early phases, so the most useful contributions now are
ideas and questions about the design. Raise them as
[GitHub issues](https://github.com/kit-dix-pincott/terza-ui/issues). See
[CONTRIBUTING.md](CONTRIBUTING.md) for the standards a change must meet.
Changes are recorded in [CHANGELOG.md](CHANGELOG.md).

## Maintainer

terza-ui is an independent open-source project, maintained by
[Kit Dix-Pincott](https://github.com/kit-dix-pincott) and released under the
[MIT license](LICENSE).
