export type DefaultDurationBaseRequest = unknown

export type UpdateDefaultDurationRequest = DefaultDurationBaseRequest & {
  pomodoro: number
  short: number
  long: number
  interval: number
}
