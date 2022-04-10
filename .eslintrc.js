module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    camelcase: [0, { properties: 'never' }],
    'no-use-before-define': 'off',
    'no-unused-vars': 'off',
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: [
          '.tsx',
          '.ts'
        ]
      }
    ]
  }
}
