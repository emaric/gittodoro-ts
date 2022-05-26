import Duration, { defaultDuration } from '@/interactor/entities/Duration'
import Session from '@/interactor/entities/Session'
import {
  CreateSessionsGatewayInterface,
  DeleteSessionsGatewayInterface,
  ReadFirstSessionGatewayInterface,
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
    DeleteSessionsGatewayInterface,
    CreateSessionsGatewayInterface,
    ReadFirstSessionGatewayInterface
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

  createWithDurationID(
    sessions: { durationId: string; start: Date; end?: Date | undefined }[]
  ): Promise<Session[]> {
    const errors: Error[] = []
    const newSessions: Session[] = []
    sessions.forEach((session, i) => {
      const duration = this.storage.duration.find(
        (d) => d.id == session.durationId
      )
      if (duration == undefined) {
        errors.push(new Error(`Invalid duration id: ${session.durationId}.`))
        return
      }
      const id = String(i + this.storage.session.length)
      const newSession = new Session(id, duration, session.start, session.end)
      newSessions.push(newSession)
    })

    if (errors.length > 0) {
      return Promise.reject(
        new SessionError('Encountered errors why creating sessions.', ...errors)
      )
    }

    this.storage.session = this.storage.session.concat(newSessions)

    return Promise.resolve(newSessions)
  }

  createWithDuration(
    sessions: {
      pomodoro: number
      short: number
      long: number
      interval: number
      start: Date
      end?: Date | undefined
    }[]
  ): Promise<Session[]> {
    const errors: Error[] = []
    const newSessions: Session[] = []
    sessions.forEach((session, i) => {
      let duration = this.storage.duration.find(
        (d) =>
          d.pomodoro == session.pomodoro &&
          d.short == session.short &&
          d.long == session.long &&
          d.interval == session.interval
      )
      if (duration == undefined) {
        const durationId = String(this.storage.duration.length)
        duration = new Duration(
          durationId,
          session.pomodoro,
          session.short,
          session.long,
          session.interval
        )
        this.storage.duration.push(duration)
      }
      const id = String(i + this.storage.session.length)
      const newSession = new Session(id, duration, session.start, session.end)
      newSessions.push(newSession)
    })

    if (errors.length > 0) {
      return Promise.reject(
        new SessionError('Encountered errors why creating sessions.', ...errors)
      )
    }

    this.storage.session = this.storage.session.concat(newSessions)

    return Promise.resolve(newSessions)
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

  first(): Promise<Session | undefined> {
    return Promise.resolve(
      this.storage.session.sort(
        (a, b) => a.start.getTime() - b.start.getTime()
      )[0]
    )
  }
}
