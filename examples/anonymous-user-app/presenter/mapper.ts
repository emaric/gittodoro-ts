import { SessionResponse } from '@/interactor/anonymous-users/session/io/response.model'
import { RecordResponse } from '@/interactor/record-timer-system/io/response.model'
import Duration from '../model/Duration'
import Record from '../model/Record'
import Session from '../model/Session'

export const mapResponseToSession = (response: SessionResponse) => {
  const { id, pomodoro, short, long, longInterval } = response.duration
  const duration = new Duration(id, pomodoro, short, long, longInterval)
  return new Session(response.id, duration, response.start, response.end)
}

export const mapResponseToRecord = (response: RecordResponse) => {
  const { state, start, end } = response
  return new Record(state, start, end)
}
