# The third way is defined by who owns the styling code and the look

**Date:** 2026-11-12

**Supersedes:** ADR-0001

ADR-0001 placed terza-ui between two camps, styled kits and headless primitives, as if nothing else stood there. That is no longer an accurate picture of Angular libraries: Angular Material and PrimeNG both offer design-token theming, and PrimeNG also has an unstyled mode. The third way is therefore defined by ownership, not by an empty middle ground. In a styled library, the library writes the styling code and brings its own look. In a headless or copy-in library, the consumer writes the styling code and owns the look. In terza-ui, the library writes the styling code and the look is the consumer's. The name still says this: _terza_ is Italian for "third".

## Consequences

- The third way explains the name. It is not the headline claim. The project's case rests on three things a reader can check: a design system expressed in plain CSS, accessibility as a build gate, and documentation built for AI-assisted teams.
- Project documents may name other libraries, in factual prose. They do not claim that those libraries lack theming.
- A component is still not finished until it has a complete look in the default theme. Leaving styling to the consumer remains out of scope.
