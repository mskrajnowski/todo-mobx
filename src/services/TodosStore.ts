import { injectable } from "inversify"
import { observable, action, computed, autorun } from "mobx"

import { Todo } from "../models/Todo"

@injectable()
export class TodosStore {
  @observable private byId = observable.map<string, Todo>()

  @computed get all() {
    return Array.from(this.byId.values())
  }

  @computed get active() {
    return this.all.filter(
      ({ isArchived, isDeleted }) => !isArchived && !isDeleted,
    )
  }

  @computed get archived() {
    return this.all.filter(
      ({ isArchived, isDeleted }) => isArchived && !isDeleted,
    )
  }

  @computed get deleted() {
    return this.all.filter(({ isDeleted }) => isDeleted)
  }

  @action
  add(todo: Todo) {
    this.byId.set(todo.id, todo)
  }

  findById(id: string) {
    return this.byId.get(id)
  }
}
