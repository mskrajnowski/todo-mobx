export interface Model<Serialized> {
  id: string
  serialize(): Serialized
}

export interface ModelConstructor<Serialized, T extends Model<Serialized>> {
  new (id?: string): T
  deserialize(data: Serialized): T
}

export type SomeModel = Model<unknown>
export type SomeModelConstructor<T extends SomeModel> = ModelConstructor<
  unknown,
  T
>
