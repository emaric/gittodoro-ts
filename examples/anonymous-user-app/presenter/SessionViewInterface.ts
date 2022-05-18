import Session from '../model/Session'

export default interface SessionViewInterface {
  render(session: Session): unknown
}
