import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
    js.configs.recommended,
    prettier,
    {
        files: ['**/*.js', '**/*.ts', "src/**/*"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.node,
            }
        },
        rules: {
            "no-console": "warn",
            "prefer-destructuring": ["error", { "object": true, "array": false }],
            "no-unused-vars": ["warn", { "argsIgnorePattern": "req|res|next" }]
        },
    },
];