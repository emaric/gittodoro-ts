export type NoteRequest = {
  timestamp: Date
  message: string
  id?: number
  date?: Date
  content?: string
  updatedAt?: Date
}

export type NoteRangeRequest = NoteRequest & {
  start: Date
  end: Date
}
