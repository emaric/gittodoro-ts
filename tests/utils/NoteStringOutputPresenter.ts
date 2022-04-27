import { NotePresenterInterface } from '@/interactor/responses/NotePresenterInterface'
import { NoteBaseResponse } from '@/interactor/responses/NoteResponse'

export class NoteStringOutputPresenter implements NotePresenterInterface {
  output: string

  constructor(output: string) {
    this.output = output
  }

  present(response: NoteBaseResponse): void {
    this.output = this.output + JSON.stringify(response)
  }
}
