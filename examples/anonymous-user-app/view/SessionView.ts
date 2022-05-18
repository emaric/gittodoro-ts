import Session from '../model/Session'
import SessionViewInterface from '../presenter/SessionViewInterface'

export default class SessionView implements SessionViewInterface {
  mainSession?: Session

  render(session: Session) {
    console.log('\n')
    console.log(new Date().toJSON() + ' [info] Rendering Session...')
    console.log(new Date().toJSON() + ' [info] Session:')
    console.table(JSON.stringify(session))
    console.log('\n')

    this.mainSession = session
  }
}
