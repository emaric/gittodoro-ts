export default class Record {
  state: string
  start: Date
  end: Date

  constructor(state: string, start: Date, end: Date) {
    this.state = state
    this.start = start
    this.end = end
  }
}
