const fs = require("fs-extra");
const path = require("path");
const logger = require("./logger");

class ProjectGenerator {
  constructor(projectPath, config, useCurrentDir = false) {
    this.projectPath = projectPath;
    this.config = config;
    this.useCurrentDir = useCurrentDir;
    this.templatesDir = path.join(__dirname, "../templates/config");
  }

  async loadTemplate(filename) {
    try {
      const templatePath = path.join(this.templatesDir, filename);
      let content = await fs.readFile(templatePath, "utf-8");
      // Extract content between backticks if it's a markdown template
      const match = content.match(/```[\w]*\n?([\s\S]*?)\n?```/);
      return match ? match[1].trim() : content;
    } catch (error) {
      logger.error(`Failed to load template ${filename}: ${error.message}`);
      throw error;
    }
  }

  replaceTemplate(content, replacements) {
    let result = content;
    for (const [key, value] of Object.entries(replacements)) {
      result = result.replace(new RegExp(`{{${key}}}`, "g"), value);
    }
    return result;
  }

  async generate() {
    try {
      await fs.ensureDir(this.projectPath);
      logger.success(`Creating project in ${this.projectPath}`);

      // Create directory structure
      await this.createDirectories();

      // Create package.json
      await this.createPackageJson();

      // Create configuration files
      await this.createConfigFiles();

      // Create source files
      await this.createSourceFiles();

      // Create utils files
      await this.createUtilsFiles();

      // Create middleware files
      await this.createMiddlewareFiles();

      logger.success("Project structure created successfully!");
      logger.info(`Next steps:`);

      if (this.useCurrentDir) {
        console.log(`  1. npm install`);
        console.log(`  2. npm run dev`);
      } else {
        console.log(`  1. cd ${path.basename(this.projectPath)}`);
        console.log(`  2. npm install`);
        console.log(`  3. npm run dev`);
      }
    } catch (error) {
      logger.error(`Failed to generate project: ${error.message}`);
      throw error;
    }
  }

  async createDirectories() {
    const dirs = [
      "src",
      "src/routes",
      "src/controllers",
      "src/models",
      "src/middleware",
      "src/utils",
      "src/config",
      "tests",
    ];

    for (const dir of dirs) {
      await fs.ensureDir(path.join(this.projectPath, dir));
    }

    logger.info("Directories created");
  }

  async createPackageJson() {
    const packageJson = this.buildPackageJson();
    await fs.writeJSON(
      path.join(this.projectPath, "package.json"),
      packageJson,
      {
        spaces: 2,
      },
    );
    logger.info("package.json created");
  }

  buildPackageJson() {
    const base = {
      name: path.basename(this.projectPath),
      version: "1.0.0",
      description: "Backend project generated with init-backend",
      main: this.config.useTypeScript ? "dist/index.js" : "src/index.js",
      scripts: {
        dev: this.config.useTypeScript
          ? "ts-node src/index.ts"
          : "node src/index.js",
        build: this.config.useTypeScript ? "tsc" : "echo 'No build needed'",
        start: this.config.useTypeScript
          ? "node dist/index.js"
          : "node src/index.js",
        test: "jest",
      },
      keywords: [this.config.framework, "backend"],
      author: "",
      license: "MIT",
      dependencies: this.buildDependencies(),
      devDependencies: this.buildDevDependencies(),
    };

    return base;
  }

  buildDependencies() {
    const deps = {
      [this.config.framework]: "^4.18.0",
    };

    if (this.config.framework === "express") {
      deps.cors = "^2.8.5";
    }

    if (this.config.databases.includes("mongodb")) {
      deps.mongoose = "^8.0.0";
      // Always include dotenv and cors for MongoDB
      deps.dotenv = "^16.3.1";
      deps.cors = "^2.8.5";
    }

    if (this.config.databases.includes("prisma")) {
      deps["@prisma/client"] = "^5.0.0";
    }

    if (this.config.databases.includes("mysql")) {
      deps.mysql2 = "^3.6.0";
    }

    if (this.config.databases.includes("postgresql")) {
      deps.pg = "^8.11.0";
    }

    if (this.config.features.includes("dotenv")) {
      deps.dotenv = "^16.3.1";
    }

    if (this.config.features.includes("jwt")) {
      deps["jsonwebtoken"] = "^9.1.0";
      deps["bcrypt"] = "^5.1.1";
    }

    return deps;
  }

  buildDevDependencies() {
    const devDeps = {
      jest: "^29.7.0",
      "jest-cli": "^29.7.0",
    };

    if (this.config.useTypeScript) {
      Object.assign(devDeps, {
        typescript: "^5.2.2",
        "ts-node": "^10.9.1",
        "@types/node": "^20.5.0",
        "@types/express": "^4.17.20",
      });

      if (this.config.databases.includes("mongodb")) {
        devDeps["@types/mongoose"] = "^5.11.97";
      }
    }

    if (this.config.features.includes("eslint")) {
      Object.assign(devDeps, {
        eslint: "^8.49.0",
        "eslint-config-prettier": "^9.0.0",
        "eslint-plugin-prettier": "^5.0.1",
      });
    }

    if (this.config.features.includes("prettier")) {
      devDeps.prettier = "^3.0.3";
    }

    if (this.config.features.includes("husky")) {
      devDeps.husky = "^8.0.3";
      devDeps["lint-staged"] = "^15.0.0";
    }

    if (this.config.features.includes("dotenv")) {
      devDeps["dotenv-cli"] = "^7.3.0";
    }

    return devDeps;
  }

  async createUtilsFiles() {
    await fs.writeFile();
  }

  async createConfigFiles() {
    // .gitignore
    const gitignore = await this.loadTemplate("gitignore-template.md");
    await fs.writeFile(path.join(this.projectPath, ".gitignore"), gitignore);

    // .env.example (always create for database configurations)
    const envTemplate = await this.loadTemplate("env-template.md");
    await fs.writeFile(
      path.join(this.projectPath, ".env.example"),
      envTemplate,
    );

    // ESLint config
    if (this.config.features.includes("eslint")) {
      const eslintConfig = await this.loadTemplate("eslint-template.md");
      await fs.writeFile(
        path.join(this.projectPath, ".eslintrc.json"),
        eslintConfig,
      );
    }

    // Prettier config
    if (this.config.features.includes("prettier")) {
      const prettierConfig = await this.loadTemplate("prettier-template.md");
      await fs.writeFile(
        path.join(this.projectPath, ".prettierrc.json"),
        prettierConfig,
      );
    }

    // TypeScript config
    if (this.config.useTypeScript) {
      const tsConfig = await this.loadTemplate("tsconfig-template.md");
      await fs.writeFile(
        path.join(this.projectPath, "tsconfig.json"),
        tsConfig,
      );
    }

    // Dockerfile
    if (this.config.features.includes("docker")) {
      const dockerfile = await this.loadTemplate("docker-template.md");
      await fs.writeFile(path.join(this.projectPath, "Dockerfile"), dockerfile);
      await fs.writeFile(
        path.join(this.projectPath, "docker-compose.yml"),
        dockerfile,
      );
    }

    // Prisma schema
    if (this.config.databases.includes("prisma")) {
      const prismaSchema = await this.loadTemplate("prisma-template.md");
      await fs.ensureDir(path.join(this.projectPath, "prisma"));
      await fs.writeFile(
        path.join(this.projectPath, "prisma", "schema.prisma"),
        prismaSchema,
      );
    }

    logger.info("Configuration files created");
  }

  async createSourceFiles() {
    const ext = this.config.useTypeScript ? "ts" : "js";
    const projectName = path.basename(this.projectPath);

    // Main entry point
    const mainTemplate = await this.loadTemplate("index-template.md");
    const mainContent = this.replaceTemplate(mainTemplate, {
      MONGODB_IMPORT: this.config.databases.includes("mongodb")
        ? "import { connectDB } from './config/database';"
        : "",
      MONGODB_CONNECT: this.config.databases.includes("mongodb")
        ? "await connectDB();"
        : "",
      MONGODB_SUCCESS: this.config.databases.includes("mongodb")
        ? "console.log(`📡 Connected to MongoDB`);"
        : "",
    });
    await fs.writeFile(
      path.join(this.projectPath, `src/index.${ext}`),
      mainContent,
    );

    // App file
    const appTemplate = await this.loadTemplate("app-template.md");
    const appContent = this.replaceTemplate(appTemplate, {
      PROJECT_NAME: projectName,
    });
    await fs.writeFile(
      path.join(this.projectPath, `src/app.${ext}`),
      appContent,
    );

    // Config file
    await fs.ensureDir(path.join(this.projectPath, "src/config"));
    const configTemplate = await this.loadTemplate("config-template.md");
    const configContent = this.replaceTemplate(configTemplate, {
      MONGODB_CONFIG: this.config.databases.includes("mongodb")
        ? "mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/mydb',"
        : "",
      JWT_CONFIG: this.config.features.includes("jwt")
        ? "jwtSecret: process.env.JWT_SECRET || 'your-secret-key',"
        : "",
    });
    await fs.writeFile(
      path.join(this.projectPath, `src/config/index.${ext}`),
      configContent,
    );

    // Database connection file if MongoDB is selected
    if (this.config.databases.includes("mongodb")) {
      const mongoTemplate = await this.loadTemplate(
        "mongodb-connection-template.md",
      );
      await fs.writeFile(
        path.join(this.projectPath, `src/config/database.${ext}`),
        mongoTemplate,
      );

      // Sample MongoDB model
      const userTemplate = await this.loadTemplate("user-model-template.md");
      const userContent = this.replaceTemplate(userTemplate, {
        TYPESCRIPT_INTERFACE: this.config.useTypeScript
          ? `interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}`
          : "",
        TYPESCRIPT_TYPE: this.config.useTypeScript ? "<IUser>" : "",
      });
      await fs.writeFile(
        path.join(this.projectPath, `src/models/User.${ext}`),
        userContent,
      );
    }

    // Prisma database file
    if (this.config.databases.includes("prisma")) {
      const prismaConnTemplate = await this.loadTemplate(
        "prisma-connection-template.md",
      );
      await fs.writeFile(
        path.join(this.projectPath, `src/config/prisma.${ext}`),
        prismaConnTemplate,
      );
    }

    logger.info("Source files created");
  }

  async createUtilsFiles() {
    const ext = this.config.useTypeScript ? "ts" : "js";

    // API Error utility
    const apiErrorTemplate = await this.loadTemplate("api-error-template.md");
    await fs.writeFile(
      path.join(this.projectPath, `src/utils/api-error.${ext}`),
      apiErrorTemplate,
    );

    // API Response utility
    const apiResponseTemplate = await this.loadTemplate(
      "api-response-template.md",
    );
    await fs.writeFile(
      path.join(this.projectPath, `src/utils/api-response.${ext}`),
      apiResponseTemplate,
    );

    // Async Catch wrapper
    const asyncCatchTemplate = await this.loadTemplate(
      "async-catch-template.md",
    );
    await fs.writeFile(
      path.join(this.projectPath, `src/utils/async-catch.${ext}`),
      asyncCatchTemplate,
    );

    logger.info("Utils files created");
  }

  async createMiddlewareFiles() {
    const ext = this.config.useTypeScript ? "ts" : "js";

    // Authenticate middleware (only if JWT is enabled)
    if (this.config.features.includes("jwt")) {
      const authMiddlewareTemplate = await this.loadTemplate(
        "authenticate-middleware-template.md",
      );
      await fs.writeFile(
        path.join(this.projectPath, `src/middleware/authenticate.${ext}`),
        authMiddlewareTemplate,
      );
    }

    // Global error handler middleware
    const errorHandlerTemplate = await this.loadTemplate(
      "global-error-handler-template.md",
    );
    await fs.writeFile(
      path.join(this.projectPath, `src/middleware/global-error-handler.${ext}`),
      errorHandlerTemplate,
    );

    logger.info("Middleware files created");
  }
}

module.exports = ProjectGenerator;
