import { SomeModel, SomeModelConstructor } from "../models/Model"

export const STORAGE = Symbol("Storage")

export interface Storage {
  store<T extends SomeModel>(model: T): Promise<T>
  retrieve<T extends SomeModel>(
    constructor: SomeModelConstructor<T>,
    id: string,
  ): Promise<T | undefined>
  retrieveAll<T extends SomeModel>(
    constructor: SomeModelConstructor<T>,
  ): Promise<T[]>
}
