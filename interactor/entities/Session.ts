import { Duration } from './Duration'

export class Session {
  id: string
  start: Date
  end?: Date | undefined
  duration: Duration

  constructor(params: {
    id: string
    start: Date
    end?: Date | undefined
    duration: Duration
  }) {
    this.id = params.id
    this.start = params.start
    this.end = params.end
    this.duration = params.duration
  }

  toString() {
    return JSON.stringify(this)
  }
}
