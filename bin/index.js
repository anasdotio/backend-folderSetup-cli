#!/usr/bin/env node

const { Command } = require("commander");
const path = require("path");
const fs = require("fs-extra");
const logger = require("../src/utils/logger");
const colors = require("../src/utils/colors");
const prompts = require("../src/utils/prompts");
const ProjectGenerator = require("../src/utils/generator");

const program = new Command();

program
  .name("init-backend")
  .description("🚀 Backend project setup CLI with multiple templates")
  .version("1.0.0");

program
  .command("create [name]")
  .description(
    "Create a new backend project with interactive setup\nUse '.' to setup in current directory",
  )
  .alias("new")
  .action(async (name) => {
    try {
      logger.title("Backend Project Generator");

      let projectName = name;
      let useCurrentDir = false;

      // Ask for project name if not provided
      if (!projectName) {
        projectName = await prompts.askProjectName();
      }

      // Check if user wants to use current directory
      if (projectName === ".") {
        useCurrentDir = true;
        const currentDir = process.cwd();
        const dirContents = fs.readdirSync(currentDir);

        if (dirContents.length > 0) {
          logger.warning("Current directory is not empty!");
          const confirm = await prompts.askUseCurrentDir();
          if (!confirm) {
            logger.warning("Setup cancelled!");
            return;
          }
        }
      } else {
        // Creating a new folder
        const projectPath = path.join(process.cwd(), projectName);

        if (fs.existsSync(projectPath)) {
          logger.warning(`Directory ${projectName} already exists!`);
          return;
        }
      }

      logger.separator();

      // Ask for project configuration
      const config = await prompts.askProjectDetails();

      // Show summary and ask for confirmation
      const proceed = await prompts.confirmSetup(config);

      if (!proceed) {
        logger.warning("Setup cancelled!");
        return;
      }

      logger.separator();
      logger.title("Creating Project");

      // Determine project path
      const projectPath = useCurrentDir
        ? process.cwd()
        : path.join(process.cwd(), projectName);

      // Generate project
      const generator = new ProjectGenerator(
        projectPath,
        config,
        useCurrentDir,
      );
      await generator.generate();

      logger.separator();
      logger.success(`✨ Project created successfully!`);
      logger.info(`Location: ${colors.primary(projectPath)}`);
      console.log(colors.dim("─".repeat(50)));
    } catch (error) {
      logger.error(error.message);
      process.exit(1);
    }
  });

// Help option
program.option("-h, --help", "Display help information").on("--help", () => {
  console.log("\n" + colors.secondary("Examples:"));
  console.log(
    "  $ init-backend create my-app          # Create 'my-app' folder with setup",
  );
  console.log(
    "  $ init-backend new                    # Prompt for project name",
  );
  console.log(
    "  $ init-backend create .               # Setup in current directory",
  );
  console.log(
    "\n" + colors.dim("For more info, visit: https://github.com/your-repo"),
  );
});

program.parse();

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
