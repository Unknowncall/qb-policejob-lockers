// Require dependencies
const path = require('path');

/**
 * Export ESLint config
 *
 * @type {Object}
 */
module.exports = {
  env: {
    es6: true,
    node: true,
    browser: false,
  },

  root: true,
  parser: '@typescript-eslint/parser',

  extends: [
    'airbnb-base',
  ],
  plugins: ['@typescript-eslint'],

  rules: {
    'no-new': 'off',
    'max-len': 'off',
    'no-shadow': 'off',
    'comma-dangle': 'off',
    'no-unused-vars': 'off',
    'linebreak-style': 'off',
    'consistent-return': 'off',
    'no-param-reassign': 'off',
    'no-underscore-dangle': 'off',
    'class-methods-use-this': 'off',
    'no-promise-executor-return': 'off',
    'import/prefer-default-export': 'off',
    'import/no-import-module-exports': 'off',

    semi: ['error', 'always'],
    '@typescript-eslint/no-unused-vars': ['error'],

    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
    ],

    'lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: true },
    ]
  },

  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],

    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },

    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/']
      }
    }
  },

  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],

      parser: '@typescript-eslint/parser',

      rules: {
        'no-undef': 'off'
      }
    },
    {
      files: ['src/index.client.ts', 'src/**/client/**/*'],
      parserOptions: {
        project: path.resolve(__dirname, '.config/tsconfig.client.json'),
        sourceType: 'module',
        tsconfigRootDir: path.resolve(__dirname, 'src')
      }
    },
    {
      files: ['src/index.server.ts', 'src/**/server/**/*'],
      parserOptions: {
        project: path.resolve(__dirname, '.config/tsconfig.server.json'),
        sourceType: 'module',
        tsconfigRootDir: path.resolve(__dirname, 'src')
      }
    }
  ]
};
