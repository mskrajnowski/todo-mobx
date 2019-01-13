import { Container } from "inversify"

import { TodosStore } from "./services/TodosStore"
import { STORAGE, Storage } from "./services/Storage"
import { LocalStorage, LOCAL_STORAGE_LATENCY } from "./services/LocalStorage"
// plop: service import

export const container = new Container({
  defaultScope: "Singleton",
})

// shortcuts
export const get = shortcut(container.get)
export const getAll = shortcut(container.getAll)
export const getNamed = shortcut(container.getNamed)
export const getAllNamed = shortcut(container.getAllNamed)
export const getTagged = shortcut(container.getTagged)
export const getAllTagged = shortcut(container.getAllTagged)

export function bindDefault() {
  container.bind(TodosStore).toSelf()
  container.bind<number>(LOCAL_STORAGE_LATENCY).toConstantValue(100)
  container.bind<Storage>(STORAGE).to(LocalStorage)
  // plop: service bind
}

function shortcut<T extends Function>(method: T): T {
  return method.bind(container) as T
}
