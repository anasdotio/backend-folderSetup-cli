#!/usr/bin/env node
const { Command } = require("commander");
const fs = require("fs");

const program = new Command();

program
  .command("create <name>")
  .description("create a new project")
  .action(async (name) => {});

program.parse();
