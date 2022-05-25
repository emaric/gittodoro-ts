import Session from '../Session'

export default interface SessionViewInterface {
  render(session: Session): unknown
}
