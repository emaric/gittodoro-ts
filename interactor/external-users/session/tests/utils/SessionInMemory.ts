import Duration, { defaultDuration } from '@/interactor/entities/Duration'
import Session from '@/interactor/entities/Session'
import {
  StartSessionGatewayInterface,
  StopSessionGatewayInterface,
} from '@/interactor/external-users/session/io/data.gateway'
import SessionError from '../../error/SessionError'

export default class SessionInMemory
  implements StartSessionGatewayInterface, StopSessionGatewayInterface
{
  storage: {
    session: Session[]
    duration: Duration[]
  }

  constructor() {
    this.storage = {
      session: [],
      duration: [defaultDuration],
    }
  }

  start(start: Date, durationId: string): Promise<Session> {
    const duration = this.storage.duration.find((d) => d.id == durationId)
    if (duration) {
      const id = String(this.storage.session.length)
      const session = new Session(id, duration, start)
      this.storage.session.push(session)
      return Promise.resolve(session)
    }
    return Promise.reject(new SessionError('Invalid duration id.'))
  }

  stop(date: Date): Promise<Session | undefined> {
    try {
      const lastIndex = this.storage.session.length - 1
      const session = this.storage.session[lastIndex]
      if (session && session.end == undefined) {
        session.end = date
        this.storage.session[lastIndex] = session
        return Promise.resolve(session)
      }
      return Promise.resolve(undefined)
    } catch (error) {
      return Promise.reject(
        new SessionError(
          'Error encountered while trying to stop a session.',
          error as Error
        )
      )
    }
  }
}
