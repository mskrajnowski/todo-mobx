import { injectable } from "inversify"
import { observable, action, computed } from "mobx"

import { Todo } from "../models/Todo"

@injectable()
export class TodosStore {
  @observable private byId: { [id: string]: Todo | undefined } = {}

  @computed get all() {
    return Object.keys(this.byId).map(key => this.byId[key]!)
  }

  @computed get active() {
    return this.all.filter(
      ({ isArchived, isDeleted }) => !isArchived && !isDeleted,
    )
  }

  @computed get archived() {
    return this.all.filter(({ isArchived }) => isArchived)
  }

  @computed get deleted() {
    return this.all.filter(({ isDeleted }) => isDeleted)
  }

  @action
  add(todo: Todo) {
    this.byId[todo.id] = todo
  }

  findById(id: string) {
    return this.byId[id]
  }
}
