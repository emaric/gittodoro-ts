import { State } from './State'
import { StateTimer } from './StateTimer'

export class Session {
  start: Date
  end?: Date
  pomodoro: number
  short: number
  long: number
  longInterval: number
  timerSequenceDuration: number
  timerSequence: StateTimer[]

  constructor(obj: {
    start: Date
    end?: Date
    pomodoro: number
    short: number
    long: number
    longInterval: number
    timerSequenceDuration: number
    timerSequence: StateTimer[]
  }) {
    this.start = obj.start
    this.end = obj.end
    this.pomodoro = obj.pomodoro
    this.short = obj.short
    this.long = obj.long
    this.longInterval = obj.longInterval
    this.timerSequenceDuration = obj.timerSequenceDuration
    this.timerSequence = obj.timerSequence
  }

  get elapsed(): number {
    const from = this.start.getTime() / 1000
    const to = (this.end ? this.end.getTime() : Date.now()) / 1000
    return Math.round(to - from)
  }

  get state(): string {
    return this.calcStateRemainingTime().state
  }

  get remainingTime(): number {
    return this.calcStateRemainingTime().remainingTime
  }

  calcStateRemainingTime(): { state: string; remainingTime: number } {
    const stateElapsed = this.elapsed % this.timerSequenceDuration

    const result = { index: -1, sum: 0 }
    this.timerSequence.some((a, i) => {
      result.index = i
      result.sum += a.duration
      if (result.sum > stateElapsed) {
        return true
      }
    }, result)

    return {
      state: State[this.timerSequence[result.index].state],
      remainingTime: result.sum - stateElapsed,
    }
  }

  toString() {
    return JSON.stringify(this)
  }
}
