# terza-ui

An Angular component library that is fully styled out of the box and themeable at every level. This glossary pins down the words used about its design.

## Language

**Third way**:
terza-ui's position between heavily styled component kits and headless primitives. Its components are complete by default and every part of their styling can be themed.
_Avoid_: hybrid, semi-headless

**Design token**:
A named design value, such as a colour, a spacing step or a radius, that components read instead of a fixed value. It is the unit of theming.
_Avoid_: variable, CSS var, style constant

**Theme**:
A complete set of design-token values that gives the components one consistent look.
_Avoid_: skin, palette, style
