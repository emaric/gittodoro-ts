export class Session {
  start: Date
  end?: Date
  pomodoro: number
  short: number
  long: number
  longInterval: number

  constructor(obj: {
    start: Date
    end?: Date
    pomodoro: number
    short: number
    long: number
    longInterval: number
  }) {
    this.start = obj.start
    this.end = obj.end
    this.pomodoro = obj.pomodoro
    this.short = obj.short
    this.long = obj.long
    this.longInterval = obj.longInterval
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
