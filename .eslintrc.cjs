module.exports = {
  env: { browser: true, es2020: true, node: true, "cypress/globals": true },
  extends: [
    'eslint:recommended',
    "plugin:react/recommended",
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/recommended',
    "plugin:@typescript-eslint/eslint-recommended",
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', '@typescript-eslint', 'cypress'],
  rules: {
    'react-refresh/only-export-components': [
      'warn'],
    '@typescript-eslint/ban-types': [
      'error',
      {
        extendDefaults: true,
        types: {
          '{}': false,
        },
      },
    ],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "no-console": 1
  },
  root: true,
};
