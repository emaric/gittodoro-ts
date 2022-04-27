import { NoteBaseResponse } from '@/interactor/responses/NoteResponse'

export interface NotePresenterInterface {
  present(response: NoteBaseResponse): void
}
