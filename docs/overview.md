# terza-ui overview

terza-ui is an Angular component library of finished, accessible components
that take on the look of your design system through a documented style API and
themes written in plain CSS.

## The name

_Terza_ is Italian for "third". Styled libraries write the styling code and
bring their own look. Headless libraries leave both to you. terza-ui takes a
third position: the library writes the styling code, and the look is yours.

## Status

The library is at its first scaffold. It ships no real components yet: the
only component is a generated placeholder (`tz-ui`) that proves the build,
packaging, Storybook and documentation pipeline. The component style API and
the themes described above are planned, and the [roadmap](roadmap.md) starts
with them.

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
- [Roadmap](roadmap.md): the phases of work and the components planned in
  each.
