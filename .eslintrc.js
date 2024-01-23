module.exports = {
    env: {
        node: true,
        browser: true,
        es2021: true
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended'
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: {
            jsx: true
        },
        sourceType: 'module'
    },
    plugins: [
        'react'
    ],
    rules: {
        'import/prefer-default-export': 'off',
        'global-require': 'off',
        'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        'no-param-reassign': 'off',
        'no-underscore-dangle': 'off',
        'no-duplicate-imports': ['error', { includeExports: true }],
        'react/jsx-uses-react': 1,
        'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
        'react/jsx-one-expression-per-line': 'off',
        'react/prop-types': 'off'
    },
    overrides: [
        {
            files: [
                "**/*.test.js",
                "**/*.test.jsx"
            ],
            env: {
                jest: true
            }
        }
    ],
    settings: {
        react: {
          version: "detect"
        }
      }
}
