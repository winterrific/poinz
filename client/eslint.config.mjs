import globals from 'globals';
import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import cypressPlugin from 'eslint-plugin-cypress';
import jestPlugin from 'eslint-plugin-jest';

export default [

  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    ...reactPlugin.configs.flat.recommended,
    ...js.configs.recommended,
    languageOptions: {
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
        ...globals.jest,
        ...globals.node,
        __POINZ_CONFIG__: false,
        io: false,
        it: false,
        cy: false,
        Cypress: false,
      },

      ecmaVersion: 2020,
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },

    plugins: {
      react: reactPlugin,
      jest: jestPlugin,
      cypress: cypressPlugin,
    },

    rules: {
      eqeqeq: 2,
      semi: [2, 'always'],
      quotes: [2, 'single'],
      curly: [2, 'all'],
      'no-use-before-define': 0,
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
    },
  }
];
