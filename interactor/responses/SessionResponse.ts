export type StateTimer = {
  state: string
  duration: number
}

export type SessionResponse = {
  id: number
  start: Date
  end?: Date
  pomodoro: number
  short: number
  long: number
  longInterval: number
  timerSequenceDuration: number
  timerSequence: StateTimer[]
}
