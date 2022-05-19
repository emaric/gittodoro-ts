import SessionTimer from '../components/timers/SessionTimer'
import Session from '../model/Session'
import SessionViewInterface from '../presenter/SessionViewInterface'

export default class SessionView implements SessionViewInterface {
  private timer?: SessionTimer
  private _session?: Session
  callback?: CallableFunction

  constructor(callback?: CallableFunction) {
    this.callback = callback
  }

  render(session: Session) {
    console.log('\n')
    console.log(new Date().toJSON() + ' [info] Rendering Session...')
    console.log(new Date().toJSON() + ' [info] Session:')
    console.table(JSON.stringify(session))
    console.log('\n')

    this._session = session
    this.callback?.(session)
  }

  get session() {
    return this._session
  }
}
