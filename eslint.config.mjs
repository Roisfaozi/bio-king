import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import prettierConfigRecommended from 'eslint-plugin-prettier/recommended';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const patchedConfig = fixupConfigRules([
  ...compat.extends(
    'next/core-web-vitals',
    'prettier',
    'plugin:tailwindcss/recommended',
  ),
]);

const config = [
  {
    ignores: [
      '**/.next',
      '**/.cache',
      '**/package-lock.json',
      '**/public',
      '**/node_modules',
      '**/next-env.d.ts',
      '**/next.config.ts',
      '**.config.ts',
      '**/pnpm-lock.yaml',
    ],
  },
  ...patchedConfig,
  ...ts.configs.recommended,
  prettierConfigRecommended,
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },

    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          args: 'none',
        },
      ],
      '@typescript-eslint/no-explicit-any': ['off'],
      'import/no-unresolved': 'warn',
      'import/named': 'off',
      'no-console': 'warn',
      'react/no-unescaped-entities': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      'react/jsx-key': 'warn',
    },
  },
];
export default config;
