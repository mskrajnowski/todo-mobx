module.exports = function(plop) {
  plop.setGenerator("component", require("./generators/component"))
  plop.setGenerator("model", require("./generators/model"))
  plop.setGenerator("service", require("./generators/service"))
  plop.setGenerator("interface", require("./generators/interface"))
}
