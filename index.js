#!/usr/bin/env node

const inquirer = require("inquirer")
const chalk = require("chalk")

// const nodeForm = require("./forms/Node")

(async () => {
  console.log(`${chalk.cyanBright("Welcome to Docker Boilerplate generator")}`)

  const language = await inquirer.prompt([
    {
      type: "list",
      name: "language",
      message: "Which programming language are you using ?",
      choices: ["JavaScript", "Node.js", "PHP", "Python", "Auto Detect"],
    },
  ])

  console.log(language)

  switch (language.language) {
  case "Node.js":
     
    // await nodeForm()
    console.log("test")
    
    break
  }
})()
