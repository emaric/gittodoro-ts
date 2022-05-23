export type RecordBaseRequest = unknown

export type CreateRecordRequest = RecordBaseRequest & {
  duration: DurationRequest
  start: Date
  current: Date
}

export type CreateNthRecordRequest = RecordBaseRequest & {
  duration: DurationRequest
  n: number
  start: Date
}

export type DurationRequest = {
  id: string
  pomodoro: number
  short: number
  long: number
  longInterval: number
}
