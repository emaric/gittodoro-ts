import { Session } from '@/interactor/entities/Session'

export interface SessionDataGatewayInterface {
  createSession(args: {
    start: Date
    pomodoro: number
    short: number
    long: number
    longInterval: number
  }): Promise<Session>

  readSession(start: Date): Promise<Session>

  endSession(end: Date): Promise<Session>

  viewSessionsByRange(start: Date, end: Date): Promise<Session[]>

  first(): Promise<Session>

  last(): Promise<Session>

  saveSessions(sessions: Session[]): Promise<Session[]>
  deleteSessions(ids: number[]): Promise<Session[]>
  getUnfinishedSessions(): Promise<Session[]>
}
