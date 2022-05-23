import {
  StartSessionGatewayInterface,
  StopSessionGatewayInterface,
} from '@/interactor/anonymous-users/session/io/data.gateway'
import { MAX_SESSION_TIME } from '@/interactor/constants'
import Duration from '@/interactor/entities/Duration'
import Session from '@/interactor/entities/Session'

export class SessionInMemory
  implements StartSessionGatewayInterface, StopSessionGatewayInterface
{
  storage: {
    duration: Duration[]
    session: Session[]
  }

  constructor(storage: { session: Session[]; duration: Duration[] }) {
    this.storage = storage
  }

  start(start: Date, durationId: string): Promise<Session> {
    const duration = this.storage.duration.find((d) => d.id == durationId)
    if (duration) {
      const session = new Session(
        String(this.storage.session.length),
        duration,
        start
      )
      this.storage.session.push(session)
      return Promise.resolve(session)
    } else {
      return Promise.reject(
        new Error(
          'Error encountered while trying to start a Session. The Duration was not found.'
        )
      )
    }
  }

  stop(date: Date): Promise<Session | undefined> {
    const lastIndex = this.storage.session.length - 1
    const last = this.storage.session[lastIndex]
    if (last) {
      if (last.elapsedMillis < MAX_SESSION_TIME) {
        last.end = date
        this.storage.session[lastIndex].end = date
        return Promise.resolve(last)
      }
    }
    return Promise.resolve(undefined)
  }
}
