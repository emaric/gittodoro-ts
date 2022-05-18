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
}
