import { NoteResponse } from '@/interactor/responses/NoteResponse'

export interface NotePresenterInterface {
  present(response: NoteResponse): void
}
