# Three themes ship: skeleton, default and high contrast

**Date:** 2026-11-12

The library ships three themes. The skeleton theme holds the minimal set of design tokens needed to theme the library, with comments on how to style each part; it is the base from which people create their own themes. The default theme gives the library its standard look. The high-contrast theme serves people with low vision. Two alternatives were considered and set aside: a single theme serving as both the default look and the template, and a bare skeleton on its own.

## Consequences

- A component is finished only when it works in all three themes.
- A fuller theme may set finer-grained tokens than the skeleton does. For example, the skeleton may set `--tz-button-padding` where another theme sets a token for each side.
