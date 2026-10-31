import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/** A WCAG conformance level. */
export type WcagLevel = 'A' | 'AA' | 'AAA';

/** The repository's accessibility conformance pair, read from the manifest. */
export interface A11yConformance {
  /** Level whose violations fail the build. */
  gate: WcagLevel;
  /** Level whose violations are reported as findings without failing. */
  target: WcagLevel;
}

const LEVELS: readonly WcagLevel[] = ['A', 'AA', 'AAA'];

/** axe-core rule tags introduced at each level (each level includes the ones below it). */
const TAGS_BY_LEVEL: Record<WcagLevel, readonly string[]> = {
  A: ['wcag2a', 'wcag21a'],
  AA: ['wcag2aa', 'wcag21aa', 'wcag22aa'],
  AAA: ['wcag2aaa'],
};

/**
 * Reads the accessibility conformance pair from `.repo/manifest.json`. The
 * manifest is the single source of truth for the levels; nothing else
 * hard-codes them.
 *
 * @param workspaceRoot - Absolute path of the repository root.
 * @returns The gate and target levels.
 * @throws When the manifest has no valid `a11y.gate` / `a11y.target` pair.
 */
export function readConformance(workspaceRoot: string): A11yConformance {
  const manifest = JSON.parse(
    readFileSync(join(workspaceRoot, '.repo', 'manifest.json'), 'utf8'),
  ) as { a11y?: Partial<A11yConformance> };
  const { gate, target } = manifest.a11y ?? {};
  if (!isLevel(gate) || !isLevel(target)) {
    throw new Error(
      '.repo/manifest.json must set a11y.gate and a11y.target to A, AA or AAA',
    );
  }
  return { gate, target };
}

/**
 * Lists the axe-core tags that together check a WCAG level.
 *
 * @param level - The conformance level to check.
 * @returns The cumulative axe-core tags for that level.
 * @example
 * ```ts
 * axeTagsFor('AA'); // ['wcag2a', 'wcag21a', 'wcag2aa', 'wcag21aa', 'wcag22aa']
 * ```
 */
export function axeTagsFor(level: WcagLevel): string[] {
  return LEVELS.slice(0, LEVELS.indexOf(level) + 1).flatMap((l) => [
    ...TAGS_BY_LEVEL[l],
  ]);
}

/**
 * Lists the axe-core tags checked at the target level but not at the gate
 * level: the rules whose violations are findings rather than failures.
 *
 * @param conformance - The repository's conformance pair.
 * @returns The target-only axe-core tags (empty when target equals gate).
 */
export function targetOnlyTags(conformance: A11yConformance): string[] {
  const gate = new Set(axeTagsFor(conformance.gate));
  return axeTagsFor(conformance.target).filter((tag) => !gate.has(tag));
}

/**
 * Narrows an unknown manifest value to a WCAG level.
 *
 * @param value - The raw manifest value.
 * @returns True when `value` is `A`, `AA` or `AAA`.
 */
function isLevel(value: unknown): value is WcagLevel {
  return LEVELS.includes(value as WcagLevel);
}
