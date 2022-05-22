export type RecordBaseRequest = unknown

export type CreateRecordRequest = RecordBaseRequest & {
  duration: DurationRequest
  start: Date
  current: Date
}

export type DurationRequest = {
  id: string
  pomodoro: number
  short: number
  long: number
  longInterval: number
}
