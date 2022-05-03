import { SessionPresenterInterface } from '@/interactor/responses/SessionPresenterInterface'
import {
  SessionBaseResponse,
  SessionResponse,
} from '@/interactor/responses/SessionResponse'

export class SessionStringOutputPresenter implements SessionPresenterInterface {
  output: string

  constructor(output: string) {
    this.output = output
  }

  present(response: SessionBaseResponse): Promise<SessionBaseResponse> {
    return new Promise((resolve) => {
      this.output = this.output + JSON.stringify(response)
      resolve(response)
    })
  }
}
