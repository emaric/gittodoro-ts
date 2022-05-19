import { SessionResponse } from '@/interactor/anonymous-users/session/io/response.model'
import Duration from '../model/Duration'
import Session from '../model/Session'

export const mapResponse = (response: SessionResponse) => {
  const { id, pomodoro, short, long, longInterval } = response.duration
  const duration = new Duration(id, pomodoro, short, long, longInterval)
  return new Session(response.id, duration, response.start, response.end)
}
