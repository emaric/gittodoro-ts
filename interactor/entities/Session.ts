import { Duration } from './Duration'

export class Session {
  id: string
  duration: Duration
  start: Date
  end?: Date

  constructor(id: string, duration: Duration, start: Date, end?: Date) {
    this.id = id
    this.duration = duration
    this.start = start
    this.end = end
  }

  toString() {
    return JSON.stringify(this)
  }

  get elapsedMillis() {
    return Date.now() - this.start.getTime()
  }
}
