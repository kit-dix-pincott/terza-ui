# Three themes ship: skeleton, default and high contrast

**Date:** 2026-11-12

The library ships three themes. The skeleton theme holds the minimal set of design tokens needed to theme the library, with comments on how to style each part; it is the base from which people create their own themes. It is a working theme, not a template to fill in: every required token has a plain, neutral value, and the components render correctly with the skeleton alone. The default theme gives the library its standard look. The high-contrast theme serves people with low vision. Two alternatives were considered and set aside: a single theme serving as both the default look and the template, and a bare skeleton on its own.

## Consequences

- A component is finished only when it works in all three themes.
- Tokens are either required or optional. The skeleton sets the required ones. A fuller theme may also set finer-grained optional tokens, which fall back to the required ones: for example, the skeleton sets `--tz-button-padding` where another theme sets a token for each side.

## Open question

Whether the skeleton theme's plain values must also pass WCAG 2.2 AA. ADR-0009 promises that for the default and high-contrast themes only.
