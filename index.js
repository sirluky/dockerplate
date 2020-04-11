const inquirer = require("inquirer")
const chalk = require("chalk")
const fs = require("fs");

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
    inquirer
      .prompt([
        {
          type: "list",
          name: "version",
          message: "Which version of Node.js you want to use ?",
          choices: [
            "Stable 12.3.5",
            "Latest 13.3.1",
            "I want to specify version",
          ],

          // filter(data) {
          //   console.log(data, "pls");
          //   return data;
          // },
        },
        {
          type: "input",
          name: "precise_version",
          message: "Type version of node you want to use e.g. 8.0.12",
          when: function ({ version }) {
            if (!version.match(/(\d+.\d+.\d+)/)) {
              return true
            }
          },
        },
      ])
      .then((choices) => { 
        const version_choice = choices.precise_version ? choices.precise_version : choices.version 

        // refactor this later to validate in prompt ->
        if(!version_choice.match(/\d+(\.?\d+)?(\.\d+)?$/)){
          console.log(chalk.red("Version doesn't exists"))
          process.exit(0)
        }
        // <-
        
        const version = version_choice.match(/\d+(\.?\d+)?(\.\d+)?$/)[0]
        if(version){
          console.log(version)
        }
      })
    break
  }
})()
