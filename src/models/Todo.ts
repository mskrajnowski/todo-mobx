import { observable, computed, action } from "mobx"
import { now } from "mobx-utils"
import uuid4 from "uuid/v4"

export class Todo {
  readonly id = uuid4()
  @observable label = ""
  @observable isCompleted = false
  @observable isArchived = false
  @observable isDeleted = false
  @observable due?: Date
  @observable created = new Date()

  @computed get isOverdue() {
    return Boolean(this.due && this.due.getTime() < now())
  }

  @action complete() {
    this.isCompleted = true
  }

  @action archive() {
    this.isArchived = true
  }

  @action delete() {
    this.isArchived = true
    this.isDeleted = true
  }
}
