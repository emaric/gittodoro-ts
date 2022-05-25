import SessionError from '@/interactor/external-users/session/error/SessionError'
import {
  StartSessionGatewayInterface,
  StopSessionGatewayInterface,
} from '@/interactor/external-users/session/io/data.gateway'
import Session from '@/interactor/entities/Session'
import storage from './storage'

export default class SessionInMemory
  implements StartSessionGatewayInterface, StopSessionGatewayInterface
{
  async start(start: Date, durationId: string): Promise<Session> {
    try {
      const duration = storage.duration.find(
        (duration) => duration.id == durationId
      )
      if (duration == undefined) {
        return Promise.reject(new SessionError('Invalid Duration'))
      }

      const session = new Session(
        String(storage.session.length),
        duration,
        start
      )
      storage.session.push(session)
      return Promise.resolve(session)
    } catch (error) {
      return Promise.reject([
        error,
        new SessionError(
          'Error encountered in SessionInMemory while trying to start a Session.'
        ),
      ])
    }
  }

  stop(date: Date): Promise<Session | undefined> {
    const lastIndex = storage.session.length - 1
    const last = storage.session[lastIndex]
    if (last?.end == undefined) {
      last.end = date
      storage.session[lastIndex] = last
      return Promise.resolve(last)
    } else {
      return Promise.resolve(undefined)
    }
  }
}
