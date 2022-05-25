import { SessionResponse } from '@/interactor/external-users/session/io/response.model'
import { RecordResponse } from '@/interactor/record-system/io/response.model'
import Duration from '../Duration'
import Record from '../Record'
import Session from '../Session'

export const mapResponseToSession = (response: SessionResponse) => {
  const { id, pomodoro, short, long, interval } = response.duration
  const duration = new Duration(id, pomodoro, short, long, interval)
  return new Session(response.id, duration, response.start, response.end)
}

export const mapResponseToRecord = (response: RecordResponse) => {
  const { state, start, end } = response
  return new Record(state, start, end)
}
