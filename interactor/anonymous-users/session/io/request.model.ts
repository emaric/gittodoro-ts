export type SessionBaseRequest = unknown

export type StartSessionRequest = SessionBaseRequest & {
  start: Date
  durationId: string
}

export type StopSessionRequest = SessionBaseRequest & {
  date: Date
}
