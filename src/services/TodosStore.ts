import { injectable, inject, decorate } from "inversify"
import { observable, action, computed, reaction, runInAction } from "mobx"

import { Todo } from "../models/Todo"
import { Storage, STORAGE } from "./Storage"
import { fromPromise } from "mobx-utils"

@injectable()
export class TodosStore {
  @observable state: "loading" | "ready" = "loading"
  @computed get isReady() {
    return this.state === "ready"
  }

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

  constructor(private storage: Storage) {
    this.recoverStored().then(() => (this.state = "ready"))
  }

  private async recoverStored() {
    const todos = await this.storage.retrieveAll(Todo)

    runInAction("recoverStored", () =>
      todos.forEach(todo => {
        this.byId.set(todo.id, todo)
        this.autoSave(todo)
      }),
    )
  }

  private autoSave(todo: Todo) {
    reaction(() => todo.serialize(), () => this.save(todo))
  }

  @action
  async add(todo: Todo) {
    const id = todo.id
    this.byId.set(id, todo)
    await this.save(todo)
    this.autoSave(todo)
  }

  @action
  async save(todo: Todo) {
    await todo.saving
    todo.saving = fromPromise(this.storage.store(todo))
  }

  findById(id: string) {
    return this.byId.get(id)
  }
}

decorate(inject(STORAGE) as ParameterDecorator, TodosStore, 0)
