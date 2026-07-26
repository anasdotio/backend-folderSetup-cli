const colors = require("./colors");
const readline = require("readline");

const spinnerFrames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

const writeLine = (line) => {
  process.stdout.write(`\r${line}`);
};

const clearLine = () => {
  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0);
};

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
    const width = Math.max(message.length + 4, 42);
    const leftPadding = Math.floor((width - message.length - 2) / 2);
    const rightPadding = width - message.length - 2 - leftPadding;

    console.log("\n" + colors.primary("┏" + "━".repeat(width) + "┓"));
    console.log(
      colors.primary("┃") +
        " ".repeat(leftPadding) +
        colors.primary(message) +
        " ".repeat(rightPadding) +
        colors.primary("┃"),
    );
    console.log(colors.primary("┗" + "━".repeat(width) + "┛") + "\n");
  },
  separator: () => {
    console.log(colors.dim("─".repeat(64)) + "\n");
  },
  startLoader: (message) => {
    const isInteractive = process.stdout.isTTY;

    if (!isInteractive) {
      logger.info(message);
      return {
        update: () => {},
        succeed: (doneMessage) => logger.success(doneMessage || message),
        fail: (errorMessage) => logger.error(errorMessage || message),
      };
    }

    let frameIndex = 0;
    let currentMessage = message;
    let isActive = true;

    const timer = setInterval(() => {
      const frame = spinnerFrames[frameIndex % spinnerFrames.length];
      writeLine(`${colors.primary(frame)} ${colors.info(currentMessage)}`);
      frameIndex += 1;
    }, 80);

    const stop = () => {
      if (!isActive) {
        return;
      }
      clearInterval(timer);
      isActive = false;
      clearLine();
    };

    return {
      update: (nextMessage) => {
        currentMessage = nextMessage;
      },
      succeed: (doneMessage) => {
        stop();
        logger.success(doneMessage || currentMessage);
      },
      fail: (errorMessage) => {
        stop();
        logger.error(errorMessage || currentMessage);
      },
    };
  },
};

module.exports = logger;
