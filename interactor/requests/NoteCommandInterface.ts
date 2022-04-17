import { NoteRequest } from './NoteRequest'

export interface NoteCommandInterface {
  execute(request: NoteRequest): void
}
