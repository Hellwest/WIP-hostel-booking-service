module.exports = {
  root: true,
  settings: {
    jest: {
      version: 26,
    },
  },
  env: {
    node: true,
    es6: true,
  },
  globals: {},
  plugins: [
    "@typescript-eslint",
    "prettier",
    "jest",
    "filenames",
    "promise",
    "import",
    "security",
    "no-secrets",
    "unicorn",
    "sql",
    "optimize-regex",
    "lodash",
    "eslint-comments",
  ],
  extends: [
    "eslint:recommended",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:jest/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint",
    "plugin:promise/recommended",
    "plugin:security/recommended",
    "plugin:unicorn/recommended",
    "plugin:lodash/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: "./",
    jsx: true,
    useJSXTextNode: true,
  },
  overrides: [
    {
      files: ["*.spec.ts"],
      env: {
        "jest/globals": true,
      },
    },
  ],
  rules: {
    // general
    "max-lines": ["error", 500],
    "no-console": "error",
    "no-dupe-keys": "error",
    "object-shorthand": "error",
    "no-use-before-define": "error",
    "no-unneeded-ternary": "error",
    "no-nested-ternary": "error",
    "eslint-comments/no-unused-disable": "error",
    "padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        prev: "*",
        next: "return",
      },
      {
        blankLine: "always",
        prev: "*",
        next: "case",
      },
      {
        blankLine: "always",
        prev: "*",
        next: "default",
      },
      {
        blankLine: "always",
        prev: "*",
        next: "block-like",
      },
    ],
    curly: "error",

    // async
    "no-restricted-syntax": [
      "error",
      {
        selector: "FunctionDeclaration[async=false][id.name=/Async$/]",
        message: "Function ending in 'Async' must be declared async",
      },
      {
        selector: "FunctionDeclaration[async=true][id.name!=/Async$/]",
        message: "Async function name must end in 'Async'",
      },
      {
        selector: "MethodDefinition[value.async=false][key.name=/Async$/]",
        message: "Method ending in 'Async' must be declared async",
      },
      {
        selector: "MethodDefinition[value.async=true][key.name!=/Async$/]",
        message: "Async method name must end in 'Async'",
      },
      {
        selector:
          "Property[value.type=/FunctionExpression$/][value.async=false][key.name=/Async$/]",
        message: "Function ending in 'Async' must be declared async",
      },
      {
        selector:
          "Property[value.type=/FunctionExpression$/][value.async=true][key.name!=/Async$/]",
        message: "Async function name must end in 'Async'",
      },
      {
        selector:
          "VariableDeclarator[init.type=/FunctionExpression$/][init.async=false][id.name=/Async$/]",
        message: "Function ending in 'Async' must be declared async",
      },
      {
        selector:
          "VariableDeclarator[init.type=/FunctionExpression$/][init.async=true][id.name!=/Async$/]",
        message: "Async function name must end in 'Async'",
      },
    ],

    // filenames
    "filenames/match-regex": ["error", "^[a-z0-9.-]+$", false],
    "filenames/match-exported": "off",
    "filenames/no-index": "error",

    // ts
    "@typescript-eslint/no-unused-vars": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars-experimental": ["error"],
    "@typescript-eslint/explicit-member-accessibility": [
      "warn",
      { accessibility: "no-public" },
    ],
    "@typescript-eslint/no-parameter-properties": "off",

    // import
    "import/order": [
      "error",
      {
        "newlines-between": "always",
      },
    ],
    "import/newline-after-import": "error",
    "import/no-anonymous-default-export": "error",
    "import/no-default-export": "error",

    // prettier
    "prettier/prettier": [
      "error",
      {
        trailingComma: "all",
        singleQuote: false,
        semi: false,
        arrowParens: "always",
      },
    ],

    // promise
    "promise/prefer-await-to-then": "error",
    "promise/prefer-await-to-callbacks": "error",

    // no-secrets
    "no-secrets/no-secrets": "error",

    // sql
    "sql/format": [
      "error",
      {
        ignoreExpressions: false,
        ignoreInline: true,
        ignoreTagless: true,
      },
    ],
    "sql/no-unsafe-query": [
      "error",
      {
        allowLiteral: false,
      },
    ],

    // regex
    "optimize-regex/optimize-regex": "warn",

    // lodash
    "lodash/prefer-lodash-method": "off",

    // unicorn
    "unicorn/prevent-abbreviations": "off",
  },
}
