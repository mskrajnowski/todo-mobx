import { observable, computed, action, toJS } from "mobx"
import { now, IPromiseBasedObservable, fromPromise } from "mobx-utils"
import uuid4 from "uuid/v4"

import { Model, ModelConstructor } from "./Model"

export class Todo implements Model<Data> {
  @observable label = ""
  @observable isCompleted = false
  @observable isArchived = false
  @observable isDeleted = false
  @observable due?: Date
  @observable created = new Date()
  @observable saving = fromPromise(Promise.resolve(this))

  constructor(public readonly id = uuid4()) {}

  @computed get isOverdue() {
    return Boolean(this.due && this.due.getTime() < now())
  }

  @action toggleCompleted(completed = !this.isCompleted) {
    this.isCompleted = completed
  }

  @action toggleArchived(archived = !this.isArchived) {
    this.isArchived = archived
  }

  @action delete() {
    this.isArchived = true
    this.isDeleted = true
  }

  serialize(): Data {
    return {
      id: this.id,
      label: this.label,
      isCompleted: this.isCompleted,
      isArchived: this.isArchived,
      isDeleted: this.isDeleted,
      due: this.due && this.due.toISOString(),
      created: this.created.toISOString(),
    }
  }

  static deserialize(data: Data): Todo {
    const { id, due, created, ...unchanged } = data

    return Object.assign(new Todo(id), {
      ...unchanged,
      due: typeof due === "string" ? new Date(due) : undefined,
      created: new Date(created),
    })
  }
}

// make sure Todo implements required static methods
Todo as ModelConstructor<Data, Todo>

interface Data {
  id: string
  label: string
  isCompleted: boolean
  isArchived: boolean
  isDeleted: boolean
  due?: string
  created: string
}
