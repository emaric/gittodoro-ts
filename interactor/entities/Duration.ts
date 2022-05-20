import constants from '@/interactor/constants'

export default class Duration {
  id: string
  pomodoro: number
  short: number
  long: number
  longInterval: number

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

export const defaultDuration = new Duration(
  constants.DEFAULT_DURATION_ID,
  constants.POMODORO,
  constants.SHORT,
  constants.LONG,
  constants.LONG_INTERVAL
)
