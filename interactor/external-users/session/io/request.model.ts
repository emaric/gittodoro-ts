export type SessionBaseRequest = unknown

export type StartSessionRequest = SessionBaseRequest & {
  start: Date
  durationId: string
}

export type StopSessionRequest = SessionBaseRequest & {
  date: Date
}

export type ReadSessionsRequest = SessionBaseRequest & {
  by: RequestBy
}

export type ReadByRange = ReadSessionsRequest & {
  startInclusive: Date
  end: Date
}

export type ReadByIDs = ReadSessionsRequest & {
  ids: string[]
}

export type DeleteSessionsRequest = SessionBaseRequest & {
  by: RequestBy
}

export type DeleteByRange = DeleteSessionsRequest & {
  startInclusive: Date
  end: Date
}

export type DeleteByIDs = DeleteSessionsRequest & {
  ids: string[]
}

export enum RequestBy {
  range,
  ids,
}
