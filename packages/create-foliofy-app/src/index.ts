#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";
import { createProject } from "./scripts/index.js";

// get the program
program
  .version("1.0.0")
  .description("CLI tool to create a Foliofy app")
  .argument("<project-name>", "name of the project")
  .action((projectName: string) => {
    // add actions to the program
    console.log(chalk.bold(`Creating a new Foliofy app: ${chalk.green(projectName)}`));
    createProject(projectName);
  });

// Execute the CLI
program.parse(process.argv);
