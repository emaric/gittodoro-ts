import { NotePresenterInterface } from '@/interactor/responses/NotePresenterInterface'
import { NoteResponse } from '@/interactor/responses/NoteResponse'

export class NoteStringOutputPresenter implements NotePresenterInterface {
  output: string

  constructor(output: string) {
    this.output = output
  }

  present(response: NoteResponse): void {
    this.output = this.output + JSON.stringify(response)
  }
}
