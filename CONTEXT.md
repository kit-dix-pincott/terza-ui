# terza-ui

An Angular component library of finished, accessible components that take on the look of a team's design system. This glossary pins down the words used about its design.

## Language

**Third way**:
terza-ui's division of ownership: the library writes the styling code, and the look belongs to the team that uses it.
_Avoid_: hybrid, semi-headless, middle ground

**Design token**:
A named design value, such as a colour, a spacing step or a radius, that components read instead of a fixed value. It is the unit of theming.
_Avoid_: variable, CSS var, style constant

**Component style API**:
The curated set of styling values that a component exposes for change.
_Avoid_: style hooks, CSS API, overrides

### Themes

**Theme**:
A set of design-token values, covering at least every required token, that gives the components one consistent look.
_Avoid_: skin, palette, style

**Skeleton theme**:
The working theme that sets only the required design tokens, with plain values, annotated for theme authors. It is the starting point for a new theme.
_Avoid_: base theme, starter theme, template

**Default theme**:
The theme that gives the library its standard look.
_Avoid_: base theme, core theme

**High-contrast theme**:
The theme that serves people with low vision.
_Avoid_: accessible theme, dark theme
