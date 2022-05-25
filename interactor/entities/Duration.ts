import constants from '@/interactor/constants'

export default class Duration {
  id: string
  pomodoro: number
  short: number
  long: number
  interval: number

  constructor(
    id: string,
    pomodoro: number,
    short: number,
    long: number,
    interval: number
  ) {
    this.id = id
    this.pomodoro = pomodoro
    this.short = short
    this.long = long
    this.interval = interval
  }

  get totalPomodoro() {
    return this.pomodoro * this.interval
  }

  get totalShort() {
    return this.short * (this.interval - 1)
  }

  get totalTime() {
    return this.long + this.totalPomodoro + this.totalShort
  }

  get pomodoroAndShort() {
    return this.pomodoro + this.short
  }
}

export const defaultDuration = new Duration(
  constants.DEFAULT_DURATION_ID,
  constants.POMODORO,
  constants.SHORT,
  constants.LONG,
  constants.INTERVAL
)
