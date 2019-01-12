const path = require("path")

module.exports = {
  description: "React Component",
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
      path: "src/components/{{pascalCase name}}.tsx",
      templateFile: path.join(__dirname, "component.tsx.hbs"),
    },
    {
      type: "add",
      path: "src/components/{{pascalCase name}}.module.scss",
      templateFile: path.join(__dirname, "component.module.scss.hbs"),
    },
  ],
}
