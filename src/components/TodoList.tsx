import { observer } from "mobx-react"
import React, { Component } from "react"

import { Todo } from "../models/Todo"

import style from "./TodoList.module.scss"
import { TodoListItem } from "./TodoListItem"

export interface TodoListProps {
  todos: Todo[]
}

@observer
export class TodoList extends Component<TodoListProps> {
  render() {
    const { todos } = this.props

    return (
      <ul className={style.root}>
        {todos.map(todo => (
          <li key={todo.id} className={style.item}>
            <TodoListItem todo={todo} />
          </li>
        ))}
      </ul>
    )
  }
}
