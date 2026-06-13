const inquirer = require("inquirer");
const colors = require("./colors");

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
        name: "framework",
        message: colors.primary("Choose a framework:"),
        choices: [
          { name: "Express.js", value: "express" },
          { name: "Fastify", value: "fastify" },
          { name: "Hapi", value: "hapi" },
        ],
        default: "express",
      },
      {
        type: "checkbox",
        name: "databases",
        message: colors.primary("Select databases (choose at least one):"),
        choices: [
          { name: "MongoDB", value: "mongodb", checked: true },
          { name: "Prisma ORM", value: "prisma" },
          { name: "MySQL", value: "mysql" },
          { name: "PostgreSQL", value: "postgresql" },
        ],
        validate: (choice) => {
          return choice.length >= 1 || "Select at least one database";
        },
      },
      {
        type: "confirm",
        name: "useTypeScript",
        message: colors.primary("Use TypeScript?"),
        default: true,
      },
      {
        type: "checkbox",
        name: "features",
        message: colors.primary("Select additional features:"),
        choices: [
          { name: "ESLint", value: "eslint", checked: true },
          { name: "Prettier", value: "prettier", checked: true },
          { name: "Docker", value: "docker" },
          { name: "JWT Authentication", value: "jwt" },
          { name: "Environment Variables (.env)", value: "dotenv" },
          { name: "Git Hooks (Husky)", value: "husky" },
        ],
      },
    ]);
    return answers;
  },

  confirmSetup: async (config) => {
    console.log("\n" + colors.secondary("📋 Setup Summary:"));
    console.log(colors.dim("─".repeat(50)));
    console.log(`  Framework: ${colors.info(config.framework)}`);
    console.log(`  Databases: ${colors.info(config.databases.join(", "))}`);
    console.log(
      `  TypeScript: ${colors.info(config.useTypeScript ? "Yes" : "No")}`,
    );
    console.log(
      `  Features: ${colors.info(config.features.join(", ") || "None")}`,
    );
    console.log(colors.dim("─".repeat(50)) + "\n");

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
