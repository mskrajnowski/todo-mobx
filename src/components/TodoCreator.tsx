import { addSeconds, addMinutes, addHours } from "date-fns"
import { observable, action } from "mobx"
import { observer } from "mobx-react"
import React, { Component, ChangeEvent, FormEvent } from "react"
import keyBy from "lodash/keyBy"

import style from "./TodoCreator.module.scss"
import { Todo } from "../models/Todo"
import { TodosStore } from "../services/TodosStore"
import { get } from "../di"

export interface TodoCreatorProps {}

interface DueOption {
  label: string
  offset: (date: Date) => Date
}

@observer
export class TodoCreator extends Component<TodoCreatorProps> {
  private todos = get<TodosStore>(TodosStore)
  @observable private label = ""
  private dueOptions: DueOption[] = [
    { label: "in 5 seconds", offset: d => addSeconds(d, 5) },
    { label: "in 30 seconds", offset: d => addSeconds(d, 30) },
    { label: "in 1 minute", offset: d => addMinutes(d, 1) },
    { label: "in 1 hour", offset: d => addHours(d, 1) },
  ]
  private dueOptionsMap = keyBy(this.dueOptions, "label")
  @observable dueOption?: DueOption

  render() {
    return (
      <div className={style.root}>
        <form onSubmit={this.create}>
          <input type="text" value={this.label} onChange={this.updateLabel} />
          <select
            value={this.dueOption && this.dueOption.label}
            onChange={this.selectDue}
          >
            <option>No due date</option>
            {this.dueOptions.map(({ label }) => (
              <option key={label} value={label}>
                {label}
              </option>
            ))}
          </select>
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
    if (this.dueOption) todo.due = this.dueOption.offset(new Date())
    this.todos.add(todo)
  }

  @action.bound
  private updateLabel(e: ChangeEvent<HTMLInputElement>) {
    this.label = e.target.value
  }

  @action.bound
  private selectDue(e: ChangeEvent<HTMLSelectElement>) {
    this.dueOption = e.target.value
      ? this.dueOptionsMap[e.target.value]
      : undefined
  }
}
