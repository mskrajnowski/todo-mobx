module.exports = function(plop) {
  plop.setGenerator("component", require("./generators/component"))
  plop.setGenerator("model", require("./generators/model"))
}
