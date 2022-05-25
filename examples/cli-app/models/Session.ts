export class Session {
  start: Date
  end?: Date
  pomodoro: number
  short: number
  long: number
  interval: number

  constructor(obj: {
    start: Date
    end?: Date
    pomodoro: number
    short: number
    long: number
    interval: number
  }) {
    this.start = obj.start
    this.end = obj.end
    this.pomodoro = obj.pomodoro
    this.short = obj.short
    this.long = obj.long
    this.interval = obj.interval
  }

  get elapsed(): number {
    const from = this.start.getTime() / 1000
    const to = (this.end ? this.end.getTime() : Date.now()) / 1000
    return Math.round(to - from)
  }

  toString() {
    return JSON.stringify(this)
  }
}
