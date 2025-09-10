module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        '@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        'react',
        '@typescript-eslint',
    ],
    rules: {
        // Regras básicas - você pode personalizar conforme necessário
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/no-explicit-any': 'warn',
        'react/prop-types': 'off', // Desabilita pois estamos usando TypeScript
        'react/react-in-jsx-scope': 'off', // Não precisa importar React no React 17+
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    ignorePatterns: [
        'dist/',
        'node_modules/',
        'storybook-static/',
        '*.config.js',
        '*.config.mjs',
    ],
};