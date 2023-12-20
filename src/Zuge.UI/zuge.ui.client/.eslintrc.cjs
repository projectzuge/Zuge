module.exports =
{
    env:
    {
        browser: true,
        es2020: true
    },
    extends:
    [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended"
    ],
    ignorePatterns:
    [
        "dist",
        ".eslintrc.cjs"
    ],
    parserOptions:
    {
        ecmaVersion: "latest",
        sourceType: "module"
    },
    plugins:
    [
        "react-refresh"
    ],
    root: true,
    rules:
    {
        "react/prop-types": "off",
        "react-refresh/only-export-components":
        [
            "warn",
            {
                allowConstantExport: true
            }
        ]
    },
    settings:
    {
        react:
        {
            version: "18.2"
        }
    }
}