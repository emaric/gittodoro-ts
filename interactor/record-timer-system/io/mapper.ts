import Duration from '@/interactor/entities/Duration'
import Session from '@/interactor/entities/Session'
import { DurationRequest } from './request.model'

export const mapRequestToDuration = (request: DurationRequest) => {
  return new Duration(
    request.id,
    request.pomodoro,
    request.short,
    request.long,
    request.longInterval
  )
}
