export enum RequestWith {
  durationID,
  duration,
}

export type DurationRequest = {
  id?: string
  pomodoro: number
  short: number
  long: number
  interval: number
}

export type RequestWithDurationID = {
  duration: { id: string }
}

export type RequestWithDuration = {
  duration: DurationRequest
}
