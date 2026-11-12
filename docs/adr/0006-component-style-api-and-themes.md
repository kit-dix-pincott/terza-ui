# Components are styled through a component style API and themes; their structure is fixed

**Date:** 2026-11-12

A component's styles are encapsulated in the component. Each component exposes a curated set of properties that may be overridden, its component style API, as CSS variables declared on its host element. A theme sits above the components and defines the `--tz-` design tokens that the component styles and style APIs read. A value in a style API can be overridden in two places: globally, in a theme, and for one instance, from the styles of the composite or view component that uses it. A component's markup, structure and behaviour are fixed. This was chosen over structural customisation (replaceable parts) and over an unstyled mode, because fixed structure is what lets the accessibility guarantees hold in every theme.

## Consequences

- A design system that needs a component to have a different structure is outside what terza-ui offers.

## Open questions

Phase 1 of the roadmap settles these, and this record does not decide them.

- How a theme overrides one type of component. The concern to test is whether a `:host` rule under Angular's emulated encapsulation outranks a plain element selector in a global stylesheet.
- How style API variables are named so that they do not collide with a consumer's own variables, since custom properties inherit.
- Whether any base values sit below the theme, and how required and optional tokens relate.
