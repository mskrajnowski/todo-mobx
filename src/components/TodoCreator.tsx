import { observer } from "mobx-react"
import React, { Component, ChangeEvent, FormEvent } from "react"

import style from "./TodoCreator.module.scss"
import { observable, action } from "mobx"
import { Todo } from "../models/Todo"
import { TodosStore } from "../services/TodosStore"
import { get } from "../di"

export interface TodoCreatorProps {}

@observer
export class TodoCreator extends Component<TodoCreatorProps> {
  private todos = get<TodosStore>(TodosStore)
  @observable private label = ""

  render() {
    return (
      <div className={style.root}>
        <form onSubmit={this.create}>
          <input type="text" value={this.label} onChange={this.updateLabel} />
          <button type="submit">+</button>
        </form>
      </div>
    )
  }

  @action.bound
  private create(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const label = this.label.trim()
    this.label = ""

    if (!label) return

    const todo = new Todo()
    todo.label = label
    this.todos.add(todo)
  }

  @action.bound
  private updateLabel(e: ChangeEvent<HTMLInputElement>) {
    this.label = e.target.value
  }
}
