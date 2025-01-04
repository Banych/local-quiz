import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintCssPlugin from 'eslint-plugin-css';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:prettier/recommended',
    'prettier/prettier',
    'plugin:react/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:css/standard'
  ),
  eslintCssPlugin.configs['flat/standard'],
  eslintConfigPrettier,
];

export default eslintConfig;
