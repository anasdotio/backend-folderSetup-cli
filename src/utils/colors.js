const chalk = require("chalk");

const colors = {
  success: (text) => chalk.green.bold(text),
  error: (text) => chalk.red.bold(text),
  warning: (text) => chalk.yellow.bold(text),
  info: (text) => chalk.blue.bold(text),
  primary: (text) => chalk.cyan.bold(text),
  secondary: (text) => chalk.magenta.bold(text),
  dim: (text) => chalk.dim(text),
  stripColor: (text) => text.replace(/\u001b\[\d+m/g, ""),
};

module.exports = colors;
