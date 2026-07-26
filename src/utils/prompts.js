const inquirer = require("inquirer");
const colors = require("./colors");

const listLabel = (name, desc) =>
  `${colors.primary(name)} ${colors.dim(`(${desc})`)}`;

const prompts = {
  askProjectName: async () => {
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "projectName",
        message: colors.primary("What is your project name?"),
        default: "my-backend",
        validate: (input) => {
          if (!input) return "Project name is required";
          if (!/^[a-zA-Z0-9_-]+$/.test(input)) {
            return "Project name can only contain letters, numbers, hyphens and underscores";
          }
          return true;
        },
      },
    ]);
    return answers.projectName;
  },

  askProjectDetails: async () => {
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "language",
        message: colors.primary("Choose project language:"),
        loop: false,
        choices: [
          {
            name: listLabel("TypeScript", "recommended for backend projects"),
            short: "TypeScript",
            value: "typescript",
          },
          {
            name: listLabel("JavaScript", "faster setup, no compilation"),
            short: "JavaScript",
            value: "javascript",
          },
        ],
        default: "typescript",
      },
      {
        type: "checkbox",
        name: "databases",
        message: colors.primary(
          "Select databases (space to toggle, enter to confirm):",
        ),
        pageSize: 8,
        loop: false,
        choices: [
          {
            name: listLabel("MongoDB", "Mongoose + document database"),
            short: "MongoDB",
            value: "mongodb",
            checked: true,
          },
          {
            name: listLabel("Prisma ORM", "Type-safe ORM workflow"),
            short: "Prisma ORM",
            value: "prisma",
          },
          {
            name: listLabel("MySQL", "Relational database"),
            short: "MySQL",
            value: "mysql",
          },
          {
            name: listLabel("PostgreSQL", "Advanced relational database"),
            short: "PostgreSQL",
            value: "postgresql",
          },
        ],
        validate: (choice) => {
          return choice.length >= 1 || "Select at least one database";
        },
      },
      {
        type: "checkbox",
        name: "features",
        message: colors.primary(
          "Select optional features (space to toggle, enter to confirm):",
        ),
        pageSize: 10,
        loop: false,
        choices: [
          {
            name: listLabel("ESLint", "linting and code quality"),
            short: "ESLint",
            value: "eslint",
            checked: true,
          },
          {
            name: listLabel("Prettier", "consistent formatting"),
            short: "Prettier",
            value: "prettier",
            checked: true,
          },
          {
            name: listLabel("Docker", "containerized local/dev runtime"),
            short: "Docker",
            value: "docker",
          },
          {
            name: listLabel("JWT Authentication", "token auth scaffolding"),
            short: "JWT Authentication",
            value: "jwt",
          },
          {
            name: listLabel("Environment Variables", ".env support"),
            short: "Environment Variables",
            value: "dotenv",
          },
          {
            name: listLabel("Testing (Jest)", "unit/integration test setup"),
            short: "Testing (Jest)",
            value: "jest",
          },
          {
            name: listLabel("Git Hooks (Husky)", "pre-commit checks"),
            short: "Git Hooks (Husky)",
            value: "husky",
          },
        ],
      },
    ]);
    const useTypeScript = answers.language === "typescript";

    return {
      framework: "express",
      useTypeScript,
      ...answers,
    };
  },

  confirmSetup: async (config) => {
    const featuresLabel = config.features.length
      ? config.features.join(", ")
      : "None";

    console.log("\n" + colors.secondary("Setup Summary"));
    console.log(colors.dim("─".repeat(64)));
    console.log(`  Runtime     : ${colors.info("Node.js + Express")}`);
    console.log(
      `  Language    : ${colors.info(config.useTypeScript ? "TypeScript" : "JavaScript")}`,
    );
    console.log(`  Databases   : ${colors.info(config.databases.join(", "))}`);
    console.log(`  Features    : ${colors.info(featuresLabel)}`);
    console.log(colors.dim("─".repeat(64)) + "\n");

    const answer = await inquirer.prompt([
      {
        type: "confirm",
        name: "proceed",
        message: colors.warning("Continue with this setup?"),
        default: true,
      },
    ]);

    return answer.proceed;
  },

  askUseCurrentDir: async () => {
    const answer = await inquirer.prompt([
      {
        type: "confirm",
        name: "proceed",
        message: colors.warning(
          "Current directory is not empty. Continue anyway?",
        ),
        default: false,
      },
    ]);

    return answer.proceed;
  },
};

module.exports = prompts;
