import SessionPresenterInterface from '@/interactor/anonymous-users/session/io/SessionPresenterInterface'
import { StopSessionResponse } from '@/interactor/anonymous-users/session/io/response.model'
import Session from '../model/Session'
import SessionViewInterface from './SessionViewInterface'
import { mapResponse } from './mapper'

export default class StopSessionPresenter implements SessionPresenterInterface {
  private view: SessionViewInterface

  constructor(view: SessionViewInterface) {
    this.view = view
  }

  present(response: StopSessionResponse): Promise<Session | undefined> {
    if (response.session) {
      const session = mapResponse(response.session)
      this.view.render(session)
      return Promise.resolve(session)
    } else {
      return Promise.resolve(undefined)
    }
  }
}
