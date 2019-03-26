import { computed } from "mobx"
import { observer } from "mobx-react"
import React, { Component } from "react"
import orderBy from "lodash/orderBy"

import { TodoCreator } from "./components/TodoCreator"
import { TodoList } from "./components/TodoList"
import { get } from "./di"
import { Todo } from "./models/Todo"
import { TodosStore } from "./services/TodosStore"

@observer
class App extends Component {
  private todos = get(TodosStore)

  private orderTodos(todos: Todo[]) {
    return orderBy(todos, ["created"], ["desc"])
  }

  @computed private get overdueTodos() {
    return this.orderTodos(
      this.todos.active.filter(
        ({ isCompleted, isOverdue }) => !isCompleted && isOverdue,
      ),
    )
  }
  @computed private get pendingTodos() {
    return this.orderTodos(
      this.todos.active.filter(
        ({ isCompleted, isOverdue }) => !isCompleted && !isOverdue,
      ),
    )
  }
  @computed private get completedTodos() {
    return this.orderTodos(
      this.todos.active.filter(({ isCompleted }) => isCompleted),
    )
  }
  @computed private get archivedTodos() {
    return this.orderTodos(this.todos.archived)
  }

  render() {
    return (
      <div>
        <h1>Todos</h1>
        <TodoCreator />
        {this.overdueTodos.length > 0 && (
          <>
            <h2>Overdue</h2>
            <TodoList todos={this.overdueTodos} />
          </>
        )}
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
        {this.archivedTodos.length > 0 && (
          <>
            <h2>Archived</h2>
            <TodoList todos={this.archivedTodos} />
          </>
        )}
      </div>
    )
  }
}

export default App
