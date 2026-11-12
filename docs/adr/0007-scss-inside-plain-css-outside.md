# SCSS inside the library, plain CSS outside it

**Date:** 2026-11-12

The library's own styles are written in SCSS, so that its authors can use mixins. What the package publishes is plain CSS: the contract with a consumer is CSS custom properties, and a theme is a plain CSS file. Two alternatives were set aside: shipping optional Sass helpers for theme authors, and a Sass theming API in which themes are built by calling mixins. The second would make Sass a requirement for every consumer and would end "theming in plain CSS" as a reason to choose the library.

## Consequences

- No consumer needs Sass to use a component or to write a theme.
- A mixin is an internal tool. Exporting one as public API would reverse this decision.
- Optional public Sass helpers can be added later without breaking anyone, and would need their own record.
