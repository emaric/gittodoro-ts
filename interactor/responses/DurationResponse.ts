export type DurationResponse = {
  pomodoro: number
  short: number
  long: number
  longInterval: number
}

export type DurationBaseResponse = {
  timestamp: Date
  message: string
  duration?: DurationResponse
  durations?: DurationResponse[]
}
