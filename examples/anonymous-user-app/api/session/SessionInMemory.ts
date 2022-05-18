import { SessionDataGatewayInterface } from '@/interactor/data-gateways/SessionDataGatewayInterface'
import { Session } from '@/interactor/entities/Session'

export default class SessionInMemory implements SessionDataGatewayInterface {
  createSession(args: {
    start: Date
    pomodoro: number
    short: number
    long: number
    longInterval: number
  }): Promise<Session> {
    throw new Error('Method not implemented.')
  }
  readSession(start: Date): Promise<Session> {
    throw new Error('Method not implemented.')
  }
  endSession(end: Date): Promise<Session> {
    throw new Error('Method not implemented.')
  }
  viewSessionsByRange(start: Date, end: Date): Promise<Session[]> {
    throw new Error('Method not implemented.')
  }
  first(): Promise<Session> {
    throw new Error('Method not implemented.')
  }
  last(): Promise<Session> {
    throw new Error('Method not implemented.')
  }
  saveSessions(sessions: Session[]): Promise<Session[]> {
    throw new Error('Method not implemented.')
  }
  deleteSessions(ids: number[]): Promise<Session[]> {
    throw new Error('Method not implemented.')
  }
}
