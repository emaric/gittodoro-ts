export type SessionBaseResponse = unknown

export type SessionListResponse = SessionBaseResponse & {
  sessions: SessionResponse[]
}

export type StartSessionResponse = SessionBaseResponse & {
  session: SessionResponse
}

export type StopSessionResponse = SessionBaseResponse & {
  session?: SessionResponse
}

export type ReadFirstSessionResponse = SessionBaseResponse & {
  session?: SessionResponse
}

export type DurationResponse = {
  id: string
  pomodoro: number
  short: number
  long: number
  interval: number
}

export type SessionResponse = {
  id: string
  start: Date
  duration: DurationResponse
  end?: Date
}
