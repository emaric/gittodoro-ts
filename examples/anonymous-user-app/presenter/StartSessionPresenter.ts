import SessionError from '@/interactor/anonymous-users/session/error/SessionError'
import {
  SessionResponse,
  StartSessionResponse,
  StopSessionResponse,
} from '@/interactor/anonymous-users/session/io/response.model'
import SessionPresenterInterface from '@/interactor/anonymous-users/session/io/SessionPresenterInterface'

import Session from '../model/Session'
import { mapResponse } from './mapper'
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
      const session = mapResponse(response.session)
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
