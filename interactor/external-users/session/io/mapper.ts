import Duration from '@/interactor/entities/Duration'
import Session from '@/interactor/entities/Session'
import { DurationResponse, SessionResponse } from './response.model'

export const mapDurationToResponse = (duration: Duration) => {
  const response: DurationResponse = {
    id: duration.id,
    pomodoro: duration.pomodoro,
    short: duration.short,
    long: duration.long,
    interval: duration.interval,
  }
  return response
}

export const mapSessionToResponse = (session: Session) => {
  const response: SessionResponse = {
    id: session.id,
    start: session.start,
    duration: mapDurationToResponse(session.duration),
    end: session.end,
  }
  return response
}

export const mapSessionListToResponse = (sessions: Session[]) => {
  return sessions.map((s) => mapSessionToResponse(s))
}
