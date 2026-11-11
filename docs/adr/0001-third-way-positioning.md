# terza-ui takes the third way: fully styled, themeable through tokens

**Date:** 2026-10-30

Angular component libraries tend to fall into two camps. Some are opinionated kits with a heavy built-in style. Others are headless primitives that the consumer styles from scratch. terza-ui takes a third position between them. Its components are fully styled out of the box, and every level of that styling can be themed through design tokens. The name says this: *terza* is Italian for "third".

## Consequences

- A component is not finished until it has a complete default look. Leaving styling to the consumer, as a headless library would, is out of scope.
- A visual value that a consumer could reasonably want to change is read from a design token. If a component hard-codes such a value, that is a defect.
