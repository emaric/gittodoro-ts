export type SessionRequest = {
  timestamp: Date
  message: string
}

export type SessionModelRequest = {
  start: Date
  pomodoro: number
  short: number
  long: number
  longInterval: number
  id?: number
  end?: Date
}

export type StartSessionRequest = SessionRequest & {
  start: Date
  pomodoro: number
  short: number
  long: number
  longInterval: number
}

export type EndSessionRequest = SessionRequest & {
  end: Date
}

export type ViewSessionRequest = SessionRequest & {
  start: Date
}

export type ViewSessionsByRangeRequest = SessionRequest & {
  start: Date
  end: Date
}

export type ViewFirstAndLastSessionsRequest = SessionRequest

export type SaveAllRequest = SessionRequest & {
  sessions: SessionModelRequest[]
}

export type DeleteAllRequest = SessionRequest & {
  ids: number[]
}
