import nx from '@nx/eslint-plugin';
import jsdoc from 'eslint-plugin-jsdoc';
import tsdoc from 'eslint-plugin-tsdoc';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist', '**/out-tsc', '**/coverage', '**/reports'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      // Scope tags enforce the dependency direction: the docs app may use the
      // library, the library may use nothing in this repo, and the e2e
      // project imports no workspace code at all.
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints: [
            {
              sourceTag: 'scope:ui',
              onlyDependOnLibsWithTags: ['scope:ui'],
            },
            {
              sourceTag: 'scope:docs',
              onlyDependOnLibsWithTags: ['scope:docs', 'scope:ui'],
            },
            {
              sourceTag: 'scope:docs-e2e',
              onlyDependOnLibsWithTags: ['scope:docs-e2e'],
            },
          ],
        },
      ],
    },
  },
  // TSDoc: every exported function, method, class, interface, type alias and
  // enum carries a valid TSDoc block with documented parameters, returns and
  // throws.
  {
    files: ['**/*.ts'],
    ...jsdoc.configs['flat/recommended-typescript-error'],
  },
  {
    files: ['**/*.ts'],
    settings: {
      jsdoc: {
        // Keep TSDoc's @typeParam (typescript mode would rewrite it to @template).
        tagNamePreference: { typeParam: 'typeParam' },
      },
    },
    plugins: { tsdoc },
    rules: {
      'tsdoc/syntax': 'error',
      'jsdoc/require-jsdoc': [
        'error',
        {
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ClassDeclaration: true,
            ArrowFunctionExpression: false,
            FunctionExpression: false,
          },
          contexts: [
            'TSInterfaceDeclaration',
            'TSTypeAliasDeclaration',
            'TSEnumDeclaration',
          ],
        },
      ],
      'jsdoc/require-param': 'error',
      'jsdoc/require-param-description': 'error',
      'jsdoc/require-returns': ['error', { exemptedBy: ['inheritDoc'] }],
      'jsdoc/require-returns-description': 'error',
      'jsdoc/require-throws': 'error',
      'jsdoc/tag-lines': ['error', 'never', { startLines: 1 }],
      'jsdoc/check-tag-names': [
        'error',
        { definedTags: ['defaultValue', 'remarks'] },
      ],
      'jsdoc/require-throws-type': 'off',
    },
  },
];
