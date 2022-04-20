export type SessionRequest = {
  message: string
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
