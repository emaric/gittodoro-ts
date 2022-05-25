import Duration, { defaultDuration } from '@/interactor/entities/Duration'
import Session from '@/interactor/entities/Session'
import {
  DeleteSessionsGatewayInterface,
  ReadSessionsGatewayInterface,
  StartSessionGatewayInterface,
  StopSessionGatewayInterface,
} from '@/interactor/external-users/session/io/data.gateway'
import SessionError from '../../error/SessionError'

export default class SessionInMemory
  implements
    StartSessionGatewayInterface,
    StopSessionGatewayInterface,
    ReadSessionsGatewayInterface,
    DeleteSessionsGatewayInterface
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

  readByRange(startInclusive: Date, end: Date): Promise<Session[]> {
    const sessions = this.storage.session.filter((s) => {
      const startedWithinRange =
        s.start.getTime() < end.getTime() &&
        s.start.getTime() >= startInclusive.getTime()

      if (startedWithinRange) {
        return true
      }

      if (s.end != undefined) {
        const endedWithinRange =
          s.end.getTime() < end.getTime() &&
          s.end.getTime() >= startInclusive.getTime()
        return endedWithinRange
      }
      return false
    })

    return Promise.resolve(sessions)
  }

  readByIDs(ids: string[]): Promise<Session[]> {
    const sessions = this.storage.session.filter((s) => ids.includes(s.id))
    return Promise.resolve(sessions)
  }

  async deleteByRange(startInclusive: Date, end: Date): Promise<Session[]> {
    const sessions = await this.readByRange(startInclusive, end)
    this.storage.session = this.storage.session.filter(
      (s) => !sessions.includes(s)
    )
    return Promise.resolve(sessions)
  }

  async deleteByIDs(ids: string[]): Promise<Session[]> {
    const sessions = await this.readByIDs(ids)
    this.storage.session = this.storage.session.filter(
      (s) => !sessions.includes(s)
    )
    return Promise.resolve(sessions)
  }
}
