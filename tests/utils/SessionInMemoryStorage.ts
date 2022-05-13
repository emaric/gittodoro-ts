import { SessionDataGatewayInterface } from '@/interactor/data-gateways/SessionDataGatewayInterface'
import { Duration } from '@/interactor/entities/Duration'
import { Session } from '@/interactor/entities/Session'

export class SessionInMemoryStorage implements SessionDataGatewayInterface {
  storage: Session[]

  constructor(storage: Session[]) {
    this.storage = storage
  }

  createSession(args: {
    start: Date
    pomodoro: number
    short: number
    long: number
    longInterval: number
  }): Promise<Session> {
    const duration = new Duration({
      ...args,
      id: -1,
    })
    const session = new Session({
      id: this.storage.length,
      start: args.start,
      duration: duration,
    })

    this.storage.push(session)

    return Promise.resolve(session)
  }

  readSession(start: Date): Promise<Session> {
    const session = this.storage.find(
      (session) => session.start.getTime() == start.getTime()
    )
    if (!session) {
      throw new Error('Not in storage.')
    }
    return Promise.resolve(session)
  }

  endSession(end: Date): Promise<Session> {
    const last = this.storage.length - 1
    this.storage[last].end = end
    return Promise.resolve(this.storage[last])
  }

  viewSessionsByRange(start: Date, end: Date) {
    return Promise.resolve(
      this.storage
        .filter(
          (session: Session) => session.start.getTime() >= start.getTime()
        )
        .filter((session: Session) => end.getTime() >= session.start.getTime())
    )
  }

  first(): Promise<Session> {
    return Promise.resolve(this.storage[0])
  }
  last(): Promise<Session> {
    return Promise.resolve(this.storage[this.storage.length - 1])
  }

  saveSessions(sessions: Session[]): Promise<Session[]> {
    throw new Error('Method not implemented.')
  }
  deleteSessions(ids: number[]): Promise<Session[]> {
    throw new Error('Method not implemented.')
  }
  getUnfinishedSessions(): Promise<Session[]> {
    throw new Error('Method not implemented.')
  }
}
