export default class Record {
  readonly state: string
  readonly start: Date
  readonly end: Date
  readonly duration: number

  constructor(state: string, start: Date, end: Date) {
    this.state = state
    this.start = start
    this.end = end
    const ms = this.end.getTime() - this.start.getTime()
    this.duration = ms / 1000
  }

  get remainingMillis() {
    return this.end.getTime() - this.start.getTime()
  }
}
