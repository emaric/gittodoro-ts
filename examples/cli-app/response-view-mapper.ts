import { SessionResponse } from '@/interactor/anonymous-users/session/io/response.model'
import { Session } from './models/Session'

export const mapSession = (session: SessionResponse): Session => {
  return new Session({
    ...session.duration,
    ...session,
  })
}
