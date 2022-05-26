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

export type CreateNotesRequest = NotesBaseRequest & {
  notes: NoteRequest[]
}

export type ReadNotesRequest = NotesBaseRequest & {
  by: RequestBy
}

export type ReadByRange = ReadNotesRequest & RequestByRange

export type ReadByIDs = ReadNotesRequest & RequestByIDs
