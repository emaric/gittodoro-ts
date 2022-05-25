export default class Duration {
  readonly id: string
  readonly pomodoro: number
  readonly short: number
  readonly long: number
  readonly interval: number

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

  get total() {
    const totalPomodoro = this.interval * this.pomodoro
    const totalShort = (this.interval - 1) * this.short
    return this.long + totalShort + totalPomodoro
  }
}
