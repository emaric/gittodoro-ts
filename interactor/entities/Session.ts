import { Duration } from './Duration'
import { StateTimer } from './StateTimer'

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

  get timerSequenceDuration(): number {
    return this.duration.timerSequenceDuration
  }

  get timerSequence(): StateTimer[] {
    return this.duration.timerSequence
  }

  toString() {
    return JSON.stringify(this)
  }
}
