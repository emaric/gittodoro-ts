import SessionError from '@/interactor/external-users/session/error/SessionError'
import { StartSessionResponse } from '@/interactor/external-users/session/io/response.model'
import SessionPresenterInterface from '@/interactor/external-users/session/io/SessionPresenterInterface'

import Session from '../Session'
import { mapResponseToSession } from './mapper'
import SessionViewInterface from './SessionViewInterface'

export default class StartSessionPresenter
  implements SessionPresenterInterface
{
  private view: SessionViewInterface

  constructor(view: SessionViewInterface) {
    this.view = view
  }

  present(response: StartSessionResponse): Promise<Session> {
    if (response.session) {
      const session = mapResponseToSession(response.session)
      this.view.render(session)
      return Promise.resolve(session)
    } else {
      return Promise.reject(
        new SessionError(
          `Failed to get a session from the given response: ${JSON.stringify(
            response
          )} while trying to start a Session.`
        )
      )
    }
  }
}
