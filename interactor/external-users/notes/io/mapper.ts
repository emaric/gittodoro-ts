import Note from '@/interactor/entities/Note'
import { NoteResponse } from './response.model'

export const mapNoteResponse = (note: Note): NoteResponse => {
  return { ...note }
}

export const mapNoteListToResponse = (notes: Note[]): NoteResponse[] => {
  return notes.map((n) => mapNoteResponse(n))
}
