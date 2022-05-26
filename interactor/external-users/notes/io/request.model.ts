import {
  RequestBy,
  RequestByIDs,
  RequestByRange,
} from '@/interactor/external-users/common/io/request.model'

export type NotesBaseRequest = unknown

export type NoteRequest = {
  content: string
  date: Date
  updatedAt?: Date
  id?: string
}

export type UpdateNoteRequest = {
  id: string
  content: string
  updatedAt: Date
}

export type CreateNotesRequest = NotesBaseRequest & {
  notes: NoteRequest[]
}

export type ReadNotesRequest = NotesBaseRequest & {
  by: RequestBy
}

export type ReadByRange = ReadNotesRequest & RequestByRange

export type ReadByIDs = ReadNotesRequest & RequestByIDs

export type UpdateNotesRequest = NotesBaseRequest & {
  notes: UpdateNoteRequest[]
}

export type DeleteNotesRequest = NotesBaseRequest & {
  by: RequestBy
}

export type DeleteByRange = DeleteNotesRequest & RequestByRange

export type DeleteByIDs = DeleteNotesRequest & RequestByIDs
