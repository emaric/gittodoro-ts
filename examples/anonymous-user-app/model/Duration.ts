export default class Duration {
  readonly id: string
  readonly pomodoro: number
  readonly short: number
  readonly long: number
  readonly longInterval: number

  constructor(
    id: string,
    pomodoro: number,
    short: number,
    long: number,
    longInterval: number
  ) {
    this.id = id
    this.pomodoro = pomodoro
    this.short = short
    this.long = long
    this.longInterval = longInterval
  }

  get pomodoroMillis() {
    return this.pomodoro * 1000
  }

  get shortMillis() {
    return this.short * 1000
  }

  get longMillis() {
    return this.long * 1000
  }

  get totalMillis() {
    const totalPomodoro = this.longInterval * this.pomodoroMillis
    const totalShort = (this.longInterval - 1) * this.shortMillis
    return this.longMillis + totalShort + totalPomodoro
  }
}
