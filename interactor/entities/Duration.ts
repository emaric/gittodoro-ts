import { State } from './State'
import { StateTimer } from './StateTimer'

export class Duration {
  id: number
  pomodoro: number
  short: number
  long: number
  longInterval: number

  constructor(params: {
    id: number
    pomodoro: number
    short: number
    long: number
    longInterval: number
  }) {
    this.id = params.id
    this.pomodoro = params.pomodoro
    this.short = params.short
    this.long = params.long
    this.longInterval = params.longInterval
  }

  get timerSequenceDuration(): number {
    return (
      this.longInterval * this.pomodoro +
      (this.longInterval - 1) * this.short +
      this.long
    )
  }

  get timerSequence(): StateTimer[] {
    const sequence = Array.from(Array(this.longInterval * 2))
    return sequence.map((_, index) => {
      if (index + 1 == sequence.length) {
        return { state: State.long, duration: this.long }
      } else if (index % 2 == 0) {
        return { state: State.pomodoro, duration: this.pomodoro }
      } else {
        return { state: State.short, duration: this.short }
      }
    })
  }
}
