export type NotesBaseRequest = unknown

export type NoteRequest = {
  content: string
  date: Date
  updatedAt?: Date
  id?: string
}

export type CreateNotesRequest = NotesBaseRequest & {
  notes: NoteRequest[]
}
