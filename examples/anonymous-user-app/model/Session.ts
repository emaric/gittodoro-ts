import constants from './constants'
import Duration from './Duration'

export default class Session {
  readonly id: string
  readonly duration: Duration
  readonly start: Date
  end?: Date

  readonly maxEnd: Date

  constructor(id: string, duration: Duration, start: Date, end?: Date) {
    this.id = id
    this.duration = duration
    this.start = start
    this.end = end

    this.maxEnd = new Date(start.getTime() + constants.MAX_SESSION_AGE_IN_MS)
  }

  get remainingActiveMillis() {
    return constants.MAX_SESSION_AGE_IN_MS - (Date.now() - this.start.getTime())
  }

  get elapsedMillis() {
    return Date.now() - this.start.getTime()
  }
}
