import React from "react"
import ReactDOM from "react-dom"

import App from "./App"
import { container } from "./di"
import { TodosStore } from "./services/TodosStore"

it("renders without crashing", () => {
  container.bind(TodosStore).toConstantValue(({
    active: [],
    archived: [],
  } as any) as TodosStore)

  const div = document.createElement("div")
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})
