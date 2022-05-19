export type SessionBaseResponse = unknown

export type StartSessionResponse = SessionBaseResponse & {
  session: SessionResponse
}

export type StopSessionResponse = SessionBaseResponse & {
  session?: SessionResponse
}

export type DurationResponse = {
  id: string
  pomodoro: number
  short: number
  long: number
  longInterval: number
}

export type SessionResponse = {
  id: string
  start: Date
  duration: DurationResponse
  end?: Date
}
