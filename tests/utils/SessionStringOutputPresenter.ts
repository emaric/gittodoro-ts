import { SessionPresenterInterface } from '@/interactor/responses/SessionPresenterInterface'
import { SessionResponse } from '@/interactor/responses/SessionResponse'

export class SessionStringOutputPresenter implements SessionPresenterInterface {
  output: string

  constructor(output: string) {
    this.output = output
  }

  present(session: SessionResponse): void {
    this.output = this.output + JSON.stringify(session)
  }
}
