# Component selectors use `tz`, design tokens use `--tz-`

**Date:** 2026-10-30

Component selectors use the prefix `tz` (`<tz-button>`). Design-token CSS custom properties use `--tz-`. The prefixes are short forms of the brand rather than of the package name `terza-ui`, which keeps templates and token names compact. Both prefixes are part of the public API: consumers write them in every template and every theme. Changing either one later is a breaking change for every consumer.
