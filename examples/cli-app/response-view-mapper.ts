import { SessionResponse } from '@/interactor/external-users/session/io/response.model'
import { Session } from './models/Session'

export const mapSession = (session: SessionResponse): Session => {
  return new Session({
    ...session.duration,
    ...session,
  })
}
