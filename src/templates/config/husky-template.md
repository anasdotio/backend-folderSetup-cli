# Husky Git Hooks Configuration

Setup file for pre-commit hooks with Husky and lint-staged.

## .husky/pre-commit

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

## .husky/commit-msg

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx --no -- commitlint --edit "${1}"
```

## package.json additions

```json
{
  "lint-staged": {
    "src/**/*.{ts,js}": ["eslint --fix", "prettier --write"]
  },
  "scripts": {
    "prepare": "husky install"
  }
}
```

## Setup

```bash
# Install Husky
npm install husky --save-dev
npx husky install

# Add pre-commit hook
npx husky add .husky/pre-commit 'npx lint-staged'

# Add commit-msg hook (optional)
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit $1'
```

## What it does

- **pre-commit**: Runs ESLint and Prettier on staged files
- **commit-msg**: Validates commit message format (if commitlint installed)

This ensures all code committed is properly formatted and linted!
