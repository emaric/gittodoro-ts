import { DurationRequest } from '@/interactor/common/io/request.model'
import Duration from '@/interactor/entities/Duration'

export const mapRequestToDuration = (request: DurationRequest) => {
  return new Duration(
    request.id || '-1',
    request.pomodoro,
    request.short,
    request.long,
    request.interval
  )
}
