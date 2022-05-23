import SessionViewInterface from '@/examples/anonymous-user-app/presenter/SessionViewInterface'
import Session from '@/examples/anonymous-user-app/model/Session'
import { logger } from '@/examples/anonymous-user-app/components/loggers'

export default class SessionView implements SessionViewInterface {
  private _session?: Session
  callback?: CallableFunction

  constructor(callback?: CallableFunction) {
    this.callback = callback
  }

  render(session: Session) {
    logger.log('Rendering Session...')
    logger.log('Session:', session, '\n\n')

    this._session = session
    this.callback?.(session)
  }

  get session() {
    return this._session
  }
}
