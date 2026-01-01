import {defineConfig} from 'eslint/config';
import globals from 'globals';

export default defineConfig([
  {
    languageOptions: {
      globals: {
        ...globals.node
      },

      ecmaVersion: 2020,
      sourceType: 'module'
    },

    rules: {
      semi: [2, 'always'],
      eqeqeq: 2,
      quotes: [2, 'single'],
      curly: [2, 'all'],
      'prefer-const': 2,
      'no-var': 2,
      'no-use-before-define': 0,
      'no-console': 0
    }
  }
]);
