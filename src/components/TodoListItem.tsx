import { observer } from "mobx-react"
import React, { Component, ChangeEvent } from "react"

import { Todo } from "../models/Todo"

import style from "./TodoListItem.module.scss"
import { action } from "mobx"

export interface TodoListItemProps {
  todo: Todo
}

@observer
export class TodoListItem extends Component<TodoListItemProps> {
  render() {
    const { todo } = this.props

    return (
      <div className={style.root}>
        <input
          type="checkbox"
          className={style.checkbox}
          checked={todo.isCompleted}
          onChange={this.toggleCompleted}
        />
        <span className={style.label}>
          {todo.label} {todo.saving.state === "pending" && "(saving)"}
        </span>
        <button type="button" onClick={this.archive}>
          Archive
        </button>
        <button type="button" onClick={this.delete}>
          Delete
        </button>
      </div>
    )
  }

  @action.bound
  private toggleCompleted(e: ChangeEvent<HTMLInputElement>) {
    this.props.todo.isCompleted = e.target.checked
  }

  @action.bound
  private archive() {
    this.props.todo.archive()
  }

  @action.bound
  private delete() {
    this.props.todo.delete()
  }
}
