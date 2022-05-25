import Duration from '@/interactor/entities/Duration'

import { DefaultDurationResponse } from './response.model'

export const mapDurationToResponse = (duration: Duration) => {
  const response: DefaultDurationResponse = {
    id: duration.id,
    pomodoro: duration.pomodoro,
    short: duration.short,
    long: duration.long,
    longInterval: duration.longInterval,
  }
  return response
}
