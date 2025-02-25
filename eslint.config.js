import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'prettier/prettier': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Node.js built-ins (fs, path, etc.)
            ['^node:.*', '^(fs|path|crypto|os|url|util)$'],

            // React-related imports
            ['^react', '^react-dom'],

            // Third-party libraries
            ['^@?\\w'],

            // UI components (@/ui-components)
            ['^@/ui-components'],

            // Components (@/components)
            ['^@/components'],

            // Utilities (@/utils)
            ['^@/utils'],

            // Constants (@/constants)
            ['^@/constants'],

            // Assets (@/assets)
            ['^@/assets'],

            // Type imports (import type)
            ['^import\\s+type'],

            // Relative imports (../, ./, /)
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            ['^/'],

            // Style imports (CSS, SCSS)
            ['^.+\\.s?css$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
  },
);
