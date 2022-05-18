import Duration from '../model/Duration'

export default interface DefaultDurationViewInterface {
  render(duration: Duration): unknown
}
