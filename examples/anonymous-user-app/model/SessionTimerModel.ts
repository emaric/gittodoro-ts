import Duration from './Duration'
import Session from './Session'
import Record from './Record'

export default class SessionTimerModel {
  defaultDuration?: Duration
  session?: Session
  records: Record[]

  constructor() {
    this.records = []
  }

  toString() {
    return JSON.stringify({ session: this.session, records: this.records })
  }
}
