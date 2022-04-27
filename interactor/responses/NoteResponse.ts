export type NoteResponse = {
  id: number
  date: Date
  content: string
  updatedAt?: Date
}

export type NoteBaseResponse = {
  timestamp: Date
  message: string
  note?: NoteResponse
  notes?: NoteResponse[]
}
