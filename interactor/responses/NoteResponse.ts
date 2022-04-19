export type Note = {
  id?: number
  date?: Date
  content?: string
  updatedAt?: Date
}

export type NoteResponse = Note & {
  timestamp?: Date
  message?: string

  notes?: Note[]
}
