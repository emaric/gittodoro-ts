import Duration from './Duration'

export default class Session {
  readonly id: string
  readonly duration: Duration
  readonly start: Date
  end?: Date

  constructor(id: string, duration: Duration, start: Date, end?: Date) {
    this.id = id
    this.duration = duration
    this.start = start
    this.end = end
  }
}
