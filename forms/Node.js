const inquirer = require("inquirer")
const {versions} = require("../versions")
const fs = require("fs")
const ejs = require("ejs")
const chalk = require("chalk")

async function formNode(){

  await inquirer
    .prompt([
      {
        type: "list",
        name: "version",
        message: "Which version of Node.js you want to use ?",
        choices: [
          `Stable ${versions.node.stable}`,
          `Latest ${versions.node.latest}`,
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
      {
        type: "list",
        name: "docker_image",
        message: "Which Docker image version you want ?",
        choices: [
          "Default - Best for development, but heavier",
          "Alpine Linux - lightweight, with great tools",
          "Slim - minimalistic version, just Node",
        ],

      },
    ])
    .then((choices) => { 
      const version_choice = choices.precise_version ? choices.precise_version : choices.version 
      const type_choice = choices.docker_image.match(/^\w+/)[0]

      // refactor this later to validate in prompt ->
      if(!version_choice.match(/\d+(\.?\d+)?(\.\d+)?$/)){
        console.log(chalk.red("Version doesn't exists"))
        process.exit(0)
      }
      // <-
   
      const version = version_choice.match(/\d+(\.?\d+)?(\.\d+)?$/)[0]
      const type = type_choice === "Default" ? "" : (type_choice.toLowerCase() + "-")

      const docker_image_version = `${type+version}`
      console.log(docker_image_version)

      if(!(fs.existsSync("Dockerfile") || fs.existsSync("prod.Dockerfile" || fs.existsSync("prod.Dockerfile") ))){

        ejs.renderFile("./templates/nodejs/dev.ejs",{version:docker_image_version}, (err,out) => {
          fs.writeFileSync("./dev.Dockerfile",out)
        })

        ejs.renderFile("./templates/nodejs/prod.ejs",{version:docker_image_version}, (err,out) => {
          fs.writeFileSync("./prod.Dockerfile",out)
        })


        console.log("Production version will be build automatically in your selected CI, or you can run")
        console.log(`${chalk.blueBright("docker build -t node-prod:" + docker_image_version + " . -f prod.Dockerfile")}`)
        console.log("")
        console.log("Build your image with this command:")
        console.log(`${chalk.blueBright("docker build -t node-dev:" + docker_image_version + " . -f dev.Dockerfile")}`)

        let dockerComposeExists = true
        console.log(`${chalk.gray("Docker-Compose file was automatically " + (dockerComposeExists ? "updated":"generated") )}`)

      } else{
        console.log(chalk.red("Dockerfiles in this directory already exists, delete them first"))
      }
    })
}


module.exports = formNode