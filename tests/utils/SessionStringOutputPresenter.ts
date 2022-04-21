import { SessionPresenterInterface } from '@/interactor/responses/SessionPresenterInterface'
import { SessionBaseResponse } from '@/interactor/responses/SessionResponse'

export class SessionStringOutputPresenter implements SessionPresenterInterface {
  output: string

  constructor(output: string) {
    this.output = output
  }

  present(session: SessionBaseResponse): void {
    this.output = this.output + JSON.stringify(session)
  }
}
