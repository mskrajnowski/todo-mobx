import { action } from "mobx"
import { observer } from "mobx-react"
import React, { Component, ChangeEvent } from "react"

import { Todo } from "../models/Todo"

import style from "./TodoListItem.module.scss"

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
        <button type="button" onClick={this.toggleArchived}>
          {todo.isArchived ? "Restore" : "Archive"}
        </button>
        {!todo.isDeleted && (
          <button type="button" onClick={this.delete}>
            Delete
          </button>
        )}
      </div>
    )
  }

  @action.bound
  private toggleCompleted(e: ChangeEvent<HTMLInputElement>) {
    this.props.todo.toggleCompleted(e.target.checked)
  }

  @action.bound
  private toggleArchived() {
    this.props.todo.toggleArchived()
  }

  @action.bound
  private delete() {
    this.props.todo.delete()
  }
}
