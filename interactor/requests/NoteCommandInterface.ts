import { NoteBaseResponse } from '../responses/NoteResponse'
import { NoteRequest } from './NoteRequest'

export interface NoteCommandInterface {
  execute(request: NoteRequest): Promise<NoteBaseResponse>
}
