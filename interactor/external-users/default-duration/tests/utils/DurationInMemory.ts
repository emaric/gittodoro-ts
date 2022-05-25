import Duration, { defaultDuration } from '@/interactor/entities/Duration'
import {
  ReadDefaultDurationDataGatewayInterface,
  ResetDefaultDurationDataGatewayInterface,
  UpdateDefaultDurationDataGatewayInterface,
} from '@/interactor/external-users/default-duration/io/data.gateway'
import DefaultDurationError from '../../error/DefaultDurationError'

export default class DurationInMemory
  implements
    ReadDefaultDurationDataGatewayInterface,
    UpdateDefaultDurationDataGatewayInterface,
    ResetDefaultDurationDataGatewayInterface
{
  storage: Duration[]
  defaultId: string

  constructor() {
    this.storage = [defaultDuration]
    this.defaultId = defaultDuration.id
  }

  getDefaultDuration(): Promise<Duration> {
    const duration = this.storage.find((d) => d.id == this.defaultId)
    if (duration) {
      return Promise.resolve(duration)
    }
    return Promise.reject(
      new DefaultDurationError('Default Duration not found.')
    )
  }

  updateDefaultDuration(
    pomodoro: number,
    short: number,
    long: number,
    interval: number
  ): Promise<Duration> {
    const duration = this.storage.find((d) => {
      return (
        d.pomodoro == pomodoro &&
        d.short == short &&
        d.long == long &&
        d.interval == interval
      )
    })
    if (duration) {
      this.defaultId = duration.id
      return Promise.resolve(duration)
    } else {
      const newDuration = new Duration(
        String(this.storage.length),
        pomodoro,
        short,
        long,
        interval
      )
      this.storage.push(newDuration)
      this.defaultId = newDuration.id
      return Promise.resolve(newDuration)
    }
  }

  resetDefaultDuration(): Promise<Duration> {
    throw new Error('Method not implemented.')
  }
}
