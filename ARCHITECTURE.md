# CLI Architecture & Project Structure

## Directory Structure

```
CLI/
├── bin/
│   └── index.js                 # Main CLI entry point
├── src/
│   ├── utils/
│   │   ├── colors.js           # Colorized output utilities
│   │   ├── logger.js           # Logging with icons and formatting
│   │   ├── prompts.js          # Interactive user prompts
│   │   └── generator.js        # Project generation logic
│   ├── commands/               # Command implementations
│   ├── templates/
│   │   ├── express/
│   │   │   └── app-template.md
│   │   └── config/
│   │       ├── eslint-template.md
│   │       ├── prettier-template.md
│   │       ├── mongodb-template.md
│   │       ├── prisma-template.md
│   │       ├── jwt-template.md
│   │       ├── docker-template.md
│   │       ├── env-template.md
│   │       └── husky-template.md
├── package.json                # CLI dependencies
├── README.md                   # Main documentation
├── FEATURES.md                 # Feature list
├── EXAMPLES.md                 # Usage examples
└── ARCHITECTURE.md             # This file

```

## How It Works

### 1. **Entry Point** (`bin/index.js`)

- Uses Commander.js for CLI command parsing
- Defines the `create` command with aliases
- Handles the main flow of project creation
- **New Feature**: Supports `.` to setup in current directory
- **Logic**:
  - If user enters `.`: Uses current working directory
  - If user enters a folder name: Creates new folder with that name
  - Validates directory state (empty or not empty)

### 2. **User Interaction** (`src/utils/prompts.js`)

- Inquirer.js for interactive prompts
- Asks about:
  - Project name (if not provided as argument)
  - Framework choice
  - Database selection
  - TypeScript preference
  - Additional features
- Validates user input
- **New Method**: `askUseCurrentDir()` - Confirms if user wants to setup in non-empty directory

### 3. **Visual Feedback** (`src/utils/colors.js` & `src/utils/logger.js`)

- Chalk for colorized terminal output
- Custom formatting with icons (✓, ✗, ⚠, ℹ)
- Styled headers and separators
- Clear success/error/warning messages

### 4. **Project Generation** (`src/utils/generator.js`)

- ProjectGenerator class handles all file creation
- Methods for creating:
  - Directory structure
  - package.json with correct dependencies
  - Configuration files (.env, ESLint, Prettier, tsconfig)
  - Source code files
- Builds dependencies based on selected options

### 5. **Templates** (`src/templates/`)

- Markdown files with code examples
- Used as reference documentation
- Easily customizable for future versions

## Key Modules

### colors.js

```javascript
colors.success(text); // Green bold text
colors.error(text); // Red bold text
colors.warning(text); // Yellow bold text
colors.info(text); // Blue bold text
colors.primary(text); // Cyan bold text
colors.secondary(text); // Magenta bold text
colors.dim(text); // Dimmed text
```

### logger.js

```javascript
logger.success(msg); // ✓ Success message
logger.error(msg); // ✗ Error message
logger.warning(msg); // ⚠ Warning message
logger.info(msg); // ℹ Info message
logger.title(msg); // Styled title header
logger.separator(); // Visual separator line
```

### prompts.js

```javascript
prompts.askProjectName(); // Get project name
prompts.askProjectDetails(); // Get configuration
prompts.confirmSetup(config); // Show summary & confirm
prompts.askUseCurrentDir(); // Confirm setup in non-empty directory
```

### generator.js - ProjectGenerator Class

```javascript
new ProjectGenerator(projectPath, config, useCurrentDir)
  .generate() // Main generation method
  .createDirectories() // Create folder structure
  .createPackageJson() // Generate package.json
  .createConfigFiles() // Create config files
  .createSourceFiles(); // Generate source code
```

## Dependency Flow

```
User runs: init-backend create my-app
    ↓
bin/index.js (Commander.js)
    ↓
calls: prompts.askProjectName() → Inquirer.js
    ↓
calls: prompts.askProjectDetails() → returns config
    ↓
calls: prompts.confirmSetup(config) → Inquirer.js
    ↓
creates: new ProjectGenerator(path, config)
    ↓
calls: generator.generate()
    ↓
creates all files and directories
    ↓
logger.success() → displays completion message
```

## Config Object Structure

```javascript
{
  framework: 'express',           // 'express', 'fastify', 'hapi'
  databases: ['mongodb', 'prisma'], // Array of selected databases
  useTypeScript: true,             // Boolean
  features: ['eslint', 'prettier', 'docker', 'jwt', 'dotenv', 'husky']
}
```

## Generated Package.json Structure

```json
{
  "name": "project-name",
  "version": "1.0.0",
  "main": "dist/index.js" or "src/index.js",
  "scripts": {
    "dev": "ts-node src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.0",
    // ... based on selected options
  },
  "devDependencies": {
    "typescript": "^5.2.2",  // if TypeScript selected
    "eslint": "^8.49.0",     // if ESLint selected
    // ... based on selected options
  }
}
```

## Extension Points

### Adding a New Feature

1. Add feature to prompts (`src/utils/prompts.js`):

   ```javascript
   { name: 'Feature Name', value: 'feature-key' }
   ```

2. Add dependency builder (`src/utils/generator.js`):

   ```javascript
   if (this.config.features.includes("feature-key")) {
     deps["package-name"] = "^version";
   }
   ```

3. Add config file creation:

   ```javascript
   if (this.config.features.includes("feature-key")) {
     await fs.writeFile(path, this.getFeatureConfig());
   }
   ```

4. Add template file (`src/templates/config/feature-template.md`)

### Adding New Framework Support

1. Add to framework choices in prompts
2. Add framework-specific dependencies
3. Add framework-specific app template
4. Add framework-specific middleware setup

### Adding New Database Support

1. Add to database choices in prompts
2. Add database driver package
3. Add connection template
4. Add schema examples

## Error Handling

- Input validation in prompts
- Directory existence checks
- File write error handling
- Graceful failure with helpful error messages

## Best Practices Implemented

- ✅ Modular code organization
- ✅ Separation of concerns
- ✅ Reusable utility functions
- ✅ Clear error messages
- ✅ User-friendly interface
- ✅ Extensible architecture
- ✅ Well-documented code
- ✅ Professional output formatting

## Future Enhancements

Potential additions:

- More framework options (Nest.js, Koa, etc.)
- GraphQL setup option
- API documentation (Swagger/OpenAPI)
- Database migration tools
- Testing framework options
- CI/CD pipeline templates
- Custom template repository
- Plugin system for extensions
- Interactive project modifications
- Project upgrade utilities
