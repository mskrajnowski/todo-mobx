import { computed, observable, autorun } from "mobx"
import { observer } from "mobx-react"
import React, { Component } from "react"

import { TodoCreator } from "./components/TodoCreator"
import { TodoList } from "./components/TodoList"
import { get } from "./di"
import { TodosStore } from "./services/TodosStore"

@observer
class App extends Component {
  private todos = get<TodosStore>(TodosStore)

  @computed get pendingTodos() {
    return this.todos.active.filter(({ isCompleted }) => !isCompleted)
  }
  @computed get completedTodos() {
    return this.todos.active.filter(({ isCompleted }) => isCompleted)
  }

  render() {
    return (
      <div>
        <h1>Todos</h1>
        <TodoCreator />
        {this.pendingTodos.length > 0 && (
          <>
            <h2>Pending</h2>
            <TodoList todos={this.pendingTodos} />
          </>
        )}
        {this.completedTodos.length > 0 && (
          <>
            <h2>Completed</h2>
            <TodoList todos={this.completedTodos} />
          </>
        )}
        {this.todos.archived.length > 0 && (
          <>
            <h2>Archived</h2>
            <TodoList todos={this.todos.archived} />
          </>
        )}
      </div>
    )
  }
}

export default App
