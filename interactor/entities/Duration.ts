export class Duration {
  id: string
  pomodoro: number
  short: number
  long: number
  longInterval: number

  constructor(params: {
    id: string
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
}

export const defaultDuration = new Duration({
  id: '0',
  pomodoro: 25 * 60,
  short: 5 * 60,
  long: 15 * 60,
  longInterval: 4,
})
