# Roadmap

terza-ui is built in phases. Each phase is small enough to finish on its
own, and the phases are ordered so that a component never arrives
before the things it depends on. No phase has a date.

The library is at its first scaffold: no phase is complete, and phase 1 is
next.

## Phase 1: Foundations

One real component proves the styling model, the themes and the accessibility
gate end to end. Everything after it reuses that proof.

- Two investigations that settle the styling mechanism:
  - how a theme overrides one type of component;
  - how component style API variables are named so that they do not collide.
- The design-token set.
- The three themes: skeleton, default and high contrast.
- A CI test that checks a theme against WCAG 2.2 AA, written so that the
  theme is an input.
- Icon.
- Button, with its primary, secondary, tertiary and ghost variants, and Icon
  Button.
- Link.
- `AGENTS.md`: the repository's working rules for AI assistants.
- A CI check that `llms.txt` lists every page in `docs/`.

## Phase 2: Form basics

- Form field: the label, hint and error message for a control.
- Text Input, with its text, password, email, number and search types.
- Textarea.
- Checkbox and Checkbox Group.
- Radio Button and Radio Group.
- Switch.
- Fieldset.

## Phase 3: Feedback and containers

- Alert.
- Badge and Status Dot.
- Spinner.
- Progress Bar.
- Card and Panel.
- Chip and Tag.
- Empty State, Error State and No Results State.

## Phase 4: Overlays

- Tooltip.
- Popover.
- Modal Dialog and Confirmation Dialog.
- Drawer.
- Toast.
- Dropdown Menu.

## Phase 5: Selection

These components sit on the popover and the listbox, so they follow the
overlays.

- Listbox.
- Select, single and multiple.
- Combobox.
- Dropdown Button and Split Button.
- Button Group.

## Phase 6: Navigation

- Tabs.
- Breadcrumb.
- Navbar.
- Sidebar Nav.
- Pagination.
- Steps.

## Phase 7: Tooling and 1.0

- The documentation shipped inside the npm package, so that it matches the
  installed version.
- An MCP server that serves component documentation, style APIs and design
  tokens to AI assistants.
- A theme accessibility checker that tests any theme against the contrast and
  focus rules.
- The first stable release, 1.0.

## Later

These areas are planned but not yet ordered. This is a list, not a
commitment to a sequence.

- Date and time: date, time, range, month and year pickers.
- Tables, lists and trees.
- Specialised inputs, such as file upload, slider, rating and tags input.
- Layout shells, such as an app shell and a sidebar layout.
- Drag and drop.
- Rich content, such as a rich text editor and code display.
- Data visualisation, such as charts and indicators.
