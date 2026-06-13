const colors = require("./colors");

const logger = {
  success: (message) => {
    console.log(colors.success("✓") + " " + message);
  },
  error: (message) => {
    console.log(colors.error("✗") + " " + message);
  },
  warning: (message) => {
    console.log(colors.warning("⚠") + " " + message);
  },
  info: (message) => {
    console.log(colors.info("ℹ") + " " + message);
  },
  title: (message) => {
    console.log(
      "\n" + colors.primary("╔" + "═".repeat(message.length + 2) + "╗"),
    );
    console.log(
      colors.primary("║") +
        " " +
        colors.primary(message) +
        " " +
        colors.primary("║"),
    );
    console.log(
      colors.primary("╚" + "═".repeat(message.length + 2) + "╝") + "\n",
    );
  },
  separator: () => {
    console.log(colors.dim("─".repeat(50)) + "\n");
  },
};

module.exports = logger;
