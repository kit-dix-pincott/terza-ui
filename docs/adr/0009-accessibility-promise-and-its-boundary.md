# The accessibility promise covers components and shipped themes, not custom themes

**Date:** 2026-11-12

Because anyone can write a theme, a component can be structurally sound while a theme still fails on colour contrast or focus visibility. The project therefore promises what it controls. Every component meets WCAG 2.2 AA for structure, keyboard use and screen reader behaviour, in every theme. The default and high-contrast themes are tested against AA in CI. A team that writes its own theme is responsible for that theme's contrast and focus styles. WCAG 2.2 AAA remains a reported target, not a guarantee. An unqualified "WCAG 2.2 AA" promise was rejected, because the first low-contrast custom theme would make it untrue.

## Consequences

- The skeleton theme's comments say which tokens affect accessibility.
- A theme accessibility checker, which tests any theme against the contrast and focus rules, is planned for phase 7 of the roadmap.
- The CI test for the shipped themes, written in phase 1, takes the theme as an input, so that the checker later packages a test that already exists.
