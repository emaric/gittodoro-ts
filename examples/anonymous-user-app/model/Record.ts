export default class Record {
  readonly state: string
  readonly start: Date
  readonly end: Date

  constructor(state: string, start: Date, end: Date) {
    this.state = state
    this.start = start
    this.end = end
  }

  get remainingMillis() {
    return this.end.getTime() - this.start.getTime()
  }

  get duration() {
    const ms = this.end.getTime() - this.start.getTime()
    return ms / 1000
  }
}
