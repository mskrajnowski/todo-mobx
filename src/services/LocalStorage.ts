import { injectable, inject, optional } from "inversify"

import { Storage } from "./Storage"
import { SomeModel, SomeModelConstructor } from "../models/Model"
import { delay } from "../utils/promise"

export const LOCAL_STORAGE_LATENCY = Symbol("LocalStorageLatency")

@injectable()
export class LocalStorage implements Storage {
  @inject(LOCAL_STORAGE_LATENCY)
  @optional()
  private latency?: number

  async store<T extends SomeModel>(model: T) {
    const data = model.serialize()

    if (this.latency) await delay(this.latency)

    const item: Item = {
      model: this.modelName(model.constructor as SomeModelConstructor<T>),
      data,
    }

    window.localStorage.setItem(model.id, JSON.stringify(item))
    return model
  }

  async retrieve<T extends SomeModel>(
    constructor: SomeModelConstructor<T>,
    id: string,
  ) {
    if (this.latency) await delay(this.latency)

    const json = window.localStorage.getItem(id) || undefined
    if (!json) return undefined

    const item = JSON.parse(json)

    if (!isItem(item)) return undefined
    if (this.modelName(constructor) !== item.model) return undefined

    return constructor.deserialize(item.data)
  }

  async retrieveAll<T extends SomeModel>(constructor: SomeModelConstructor<T>) {
    if (this.latency) await delay(this.latency)

    const instances: T[] = []
    const model = this.modelName(constructor)

    for (let i = 0; i < window.localStorage.length; ++i) {
      const id = window.localStorage.key(i)!
      const json = window.localStorage.getItem(id)!
      const item = JSON.parse(json)

      if (isItem(item) && item.model === model) {
        instances.push(constructor.deserialize(item.data))
      }
    }

    return instances
  }

  private modelName(constructor: SomeModelConstructor<SomeModel>) {
    return constructor.name
  }
}

interface Item {
  model: string
  data: any
}

function isItem(value: any): value is Item {
  return (
    typeof value === "object" &&
    typeof value.model === "string" &&
    typeof value.data === "object"
  )
}
