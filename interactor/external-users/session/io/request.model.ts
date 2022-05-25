export type SessionBaseRequest = unknown

export type DurationRequest = {
  id?: string
  pomodoro: number
  short: number
  long: number
  interval: number
}

export type SessionRequestWithDurationID = {
  duration: { id: string }
  start: Date
  end?: Date
  id?: string
}

export type SessionRequestWithDuration = {
  duration: DurationRequest
  start: Date
  end?: Date
  id?: string
}

export type RequestByRange = {
  startInclusive: Date
  end: Date
}

export type RequestByIDs = {
  ids: string[]
}

export type StartSessionRequest = SessionBaseRequest & {
  start: Date
  durationId: string
}

export type StopSessionRequest = SessionBaseRequest & {
  date: Date
}

export type CreateSessionsRequest = SessionBaseRequest & {
  with: RequestWith
}

export type CreateWithDurationID = CreateSessionsRequest & {
  sessions: SessionRequestWithDurationID[]
}

export type CreateWithDuration = CreateSessionsRequest & {
  sessions: SessionRequestWithDuration[]
}

export type ReadSessionsRequest = SessionBaseRequest & {
  by: RequestBy
}

export type ReadByRange = ReadSessionsRequest & RequestByRange

export type ReadByIDs = ReadSessionsRequest & RequestByIDs

export type DeleteSessionsRequest = SessionBaseRequest & {
  by: RequestBy
}

export type DeleteByRange = DeleteSessionsRequest & RequestByRange

export type DeleteByIDs = DeleteSessionsRequest & RequestByIDs

export enum RequestBy {
  range,
  ids,
}

export enum RequestWith {
  durationID,
  duration,
}
