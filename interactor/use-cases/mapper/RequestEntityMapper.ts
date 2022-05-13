import { Duration } from '@/interactor/entities/Duration'
import { Session } from '@/interactor/entities/Session'
import { SessionModelRequest } from '@/interactor/requests/SessionRequest'

export const mapSessionRequest = (request: SessionModelRequest): Session => {
  const session = new Session({
    duration: new Duration({ ...request, id: -1 }),
    ...request,
    id: request.id || -1,
  })

  return session
}

export const mapRequestsToSessions = (
  requests: SessionModelRequest[]
): Session[] => {
  return requests.map((request) => mapSessionRequest(request))
}
