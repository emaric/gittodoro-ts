export enum RequestBy {
  range,
  ids,
}

export type RequestByRange = {
  startInclusive: Date
  end: Date
}

export type RequestByIDs = {
  ids: string[]
}
