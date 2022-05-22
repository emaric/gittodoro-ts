export type RecordBaseResponse = unknown

export type CreateRecordResponse = RecordBaseResponse & {
  record: RecordResponse
}

export type RecordResponse = {
  state: string
  start: Date
  end: Date
}
