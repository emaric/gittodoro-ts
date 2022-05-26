export type NotesBaseResponse = unknown

export type NoteResponse = {
  content: string
  date: Date
  updateAt?: Date
  id?: string
}

export type NoteListResponse = NotesBaseResponse & {
  notes: NoteResponse[]
}

export type ReadFirstNoteResponse = NotesBaseResponse & {
  note?: NoteResponse
}
