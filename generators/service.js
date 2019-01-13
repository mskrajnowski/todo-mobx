const path = require("path")

module.exports = {
  description: "Service",
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
      path: "src/services/{{pascalCase name}}.ts",
      templateFile: path.join(__dirname, "service.ts.hbs"),
    },
    {
      type: "modify",
      path: "src/di.ts",
      pattern: /(^\/\/ plop: service import\n$)/m,
      template: `import { {{ pascalCase name }} } from "./services/{{ pascalCase name }}"\n$1`,
    },
    {
      type: "modify",
      path: "src/di.ts",
      pattern: /(^(\s*)\/\/ plop: service bind$)/m,
      template: `$2container.bind({{ pascalCase name }}).toSelf()\n$1`,
    },
  ],
}
