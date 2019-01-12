const path = require("path")

module.exports = {
  description: "Mobx model",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "Name",
    },
  ],
  actions: [
    {
      type: "add",
      path: "src/models/{{pascalCase name}}.ts",
      templateFile: path.join(__dirname, "model.ts.hbs"),
    },
  ],
}
