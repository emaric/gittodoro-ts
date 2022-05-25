export type DefaultDurationBaseResponse = unknown

export type DefaultDurationResponse = {
  id: string
  pomodoro: number
  short: number
  long: number
  interval: number
}

export type ReadDefaultDurationResponse = DefaultDurationBaseResponse & {
  duration?: DefaultDurationResponse
}

export type UpdateDefaultDurationResponse = DefaultDurationBaseResponse & {
  duration: DefaultDurationResponse
}

export type ResetDefaultDurationResponse = DefaultDurationBaseResponse & {
  duration: DefaultDurationResponse
}
