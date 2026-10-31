# terza-ui overview

terza-ui is an Angular component library that takes a third way: fully styled
out of the box, yet themeable at every level through design tokens. _Terza_ is
Italian for "third".

## Status

The library is at its first scaffold. It ships no components yet: the only
component is a generated placeholder (`tz-ui`) that proves the build,
packaging, Storybook and documentation pipeline.

## Conventions

- Component selectors use the `tz` prefix, for example `tz-button`.
- Design tokens are CSS custom properties with the `--tz-` prefix. No tokens
  are defined yet.
- Components are standalone and work without zone.js (zoneless change
  detection).
- Accessibility: every component must meet WCAG 2.2 AA (checked in CI) and
  aims for AAA where practical (reported, not enforced).

## Documentation

- [Getting started](getting-started.md): installing the package and using a
  component.
