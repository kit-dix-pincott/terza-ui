# AI support serves two audiences: teams using the library and contributors to it

**Date:** 2026-11-12

terza-ui is built to be used accurately by AI coding assistants, and that support is planned for two separate audiences. Teams that use the library get documentation shipped inside the npm package, so that an assistant reads the documentation matching the installed version, and an MCP server that serves component documentation, style APIs and design tokens. Contributors get an `AGENTS.md` and a CI check that keeps `llms.txt` in step with `docs/`. The curated component style API is part of this support: an assistant works from a short, documented list of variables for each component instead of guessing at internal selectors.

## Consequences

- The contributor items belong to phase 1 of the roadmap, and the items for teams using the library to phase 7.
- Project documents describe terza-ui as a UI library that assistants can use accurately. They do not describe it as AI tooling or AI infrastructure.
