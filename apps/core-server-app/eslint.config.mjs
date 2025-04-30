// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import sonarjs from 'eslint-plugin-sonarjs';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import pluginPromise from 'eslint-plugin-promise';
import pluginJest from 'eslint-plugin-jest';
import stylistic from '@stylistic/eslint-plugin';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  sonarjs.configs.recommended,
  eslintPluginUnicorn.configs.recommended,
  pluginPromise.configs['flat/recommended'],
  eslintPluginPrettierRecommended,
  pluginJest.configs['flat/recommended'],
  stylistic.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      'unicorn/prefer-top-level-await': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-null': 'off',
      '@stylistic/semi': 'off',
      '@stylistic/quotes': 'off',
      '@stylistic/indent': 'off',
      '@stylistic/brace-style': 'off',
      '@stylistic/operator-linebreak': 'off',
      '@stylistic/padding-line-between-statements': [
        'error',

        {
          blankLine: 'always',
          prev: '*',
          next: ['return', 'throw', 'break', 'continue'],
        },
        { blankLine: 'always', prev: ['if', 'switch', 'try'], next: '*' },
        {
          blankLine: 'always',
          prev: '*',
          next: ['function', 'class', 'interface', 'type', 'export'],
        },
        {
          blankLine: 'always',
          prev: ['const', 'let', 'var'],
          next: 'expression',
        },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var'],
        },
        { blankLine: 'always', prev: '*', next: 'export' },
        { blankLine: 'any', prev: 'export', next: 'export' },
      ],
    },
  },
);
