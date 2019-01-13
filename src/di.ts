import { Container } from "inversify"

// plop: service import

export const container = new Container()

// shortcuts
export const get = shortcut(container.get)
export const getAll = shortcut(container.getAll)
export const getNamed = shortcut(container.getNamed)
export const getAllNamed = shortcut(container.getAllNamed)
export const getTagged = shortcut(container.getTagged)
export const getAllTagged = shortcut(container.getAllTagged)

export function bindDefault() {
  // plop: service bind
}

function shortcut<T extends Function>(method: T): T {
  return method.bind(container) as T
}
