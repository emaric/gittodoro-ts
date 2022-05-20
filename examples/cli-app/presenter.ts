import { mapSession } from './response-view-mapper'
import { Session } from './models/Session'
import SessionPresenterInterface from '@/interactor/anonymous-users/session/io/SessionPresenterInterface'
import {
  StartSessionResponse,
  StopSessionResponse,
} from '@/interactor/anonymous-users/session/io/response.model'

export interface CLIView {
  display(content: Session): void
}

export class SessionCLIPresenter implements SessionPresenterInterface {
  cliView: CLIView

  constructor(cliView: CLIView) {
    this.cliView = cliView
  }
  present(
    response: StartSessionResponse | StopSessionResponse
  ): Promise<Session> {
    return new Promise((resolve, reject) => {
      if (response.session) {
        const session = mapSession(response.session)
        this.cliView.display(session)
        resolve(session)
      } else {
        reject('No session to present.')
      }
    })
  }
}
