import Session from '@/interactor/entities/Session'

export interface StartSessionGatewayInterface {
  startWithDurationID(start: Date, durationId: string): Promise<Session>

  startWithDuration(
    start: Date,
    pomodoro: number,
    short: number,
    long: number,
    interval: number
  ): Promise<Session>
}

export interface StopSessionGatewayInterface {
  stop(date: Date): Promise<Session | undefined>
}

export interface CreateSessionsGatewayInterface {
  createWithDurationID(
    sessions: {
      durationId: string
      start: Date
      end?: Date
    }[]
  ): Promise<Session[]>

  createWithDuration(
    sessions: {
      pomodoro: number
      short: number
      long: number
      interval: number
      start: Date
      end?: Date
    }[]
  ): Promise<Session[]>
}

export interface ReadSessionsGatewayInterface {
  readByRange(startInclusive: Date, end: Date): Promise<Session[]>

  readByIDs(ids: string[]): Promise<Session[]>
}

export interface DeleteSessionsGatewayInterface {
  deleteByRange(startInclusive: Date, end: Date): Promise<Session[]>

  deleteByIDs(ids: string[]): Promise<Session[]>
}

export interface ReadFirstSessionGatewayInterface {
  first(): Promise<Session | undefined>
}
