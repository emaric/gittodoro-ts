export default class Record {
  readonly state: string
  readonly start: Date
  end: Date

  constructor(state: string, start: Date, end: Date) {
    this.state = state
    this.start = start
    this.end = end
  }
}
