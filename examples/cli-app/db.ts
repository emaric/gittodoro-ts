import { SessionDataGatewayInterface } from '../../interactor/data-gateways/SessionDataGatewayInterface'
import { Duration } from '../../interactor/entities/Duration'
import { Session } from '../../interactor/entities/Session'

export class SessionInMemory implements SessionDataGatewayInterface {
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
  }): Session {
    const session = new Session({
      ...args,
      id: this.storage.length,
      duration: new Duration({
        ...args,
        id: -1,
      }),
    })
    this.storage.push(session)
    return session
  }

  readSession(start: Date): Session {
    const session = this.storage.find(
      (session) => session.start.getTime() == start.getTime()
    )

    if (!session) {
      throw new Error('Not found.')
    }

    return session
  }

  endSession(end: Date): Session {
    const last = this.storage.length - 1
    this.storage[last].end = end
    return this.storage[last]
  }
}
