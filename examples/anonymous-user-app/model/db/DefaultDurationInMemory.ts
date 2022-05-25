import {
  ReadDefaultDurationDataGatewayInterface,
  ResetDefaultDurationDataGatewayInterface,
  UpdateDefaultDurationDataGatewayInterface,
} from '@/interactor/external-users/default-duration/io/data.gateway'
import { defaultDuration } from '@/interactor/entities/Duration'
import Duration from '@/interactor/entities/Duration'
import storage from './storage'

export default class DefaultDurationInMemory
  implements
    ReadDefaultDurationDataGatewayInterface,
    UpdateDefaultDurationDataGatewayInterface,
    ResetDefaultDurationDataGatewayInterface
{
  private defaultDurationId

  constructor() {
    storage.duration = [defaultDuration]
    this.defaultDurationId = storage.duration[0].id
  }

  getDefaultDuration(): Promise<Duration> {
    const duration = storage.duration.find(
      (duration) => duration.id === this.defaultDurationId
    )
    if (duration) {
      return Promise.resolve(duration)
    } else {
      return Promise.reject(
        new Error(`Failed to find Duration with id: ${this.defaultDurationId}`)
      )
    }
  }

  updateDefaultDuration(
    pomodoro: number,
    short: number,
    long: number,
    longInterval: number
  ): Promise<Duration> {
    const duplicate = storage.duration.find(
      (duration) =>
        duration.pomodoro == pomodoro &&
        duration.short == short &&
        duration.long == long &&
        duration.longInterval == longInterval
    )
    if (duplicate) {
      this.defaultDurationId = duplicate.id
      return Promise.resolve(duplicate)
    } else {
      const duration = new Duration(
        String(storage.duration.length),
        pomodoro,
        short,
        long,
        longInterval
      )
      storage.duration.push(duration)
      this.defaultDurationId = duration.id
      return Promise.resolve(duration)
    }
  }

  resetDefaultDuration(): Promise<Duration> {
    this.defaultDurationId = defaultDuration.id
    return Promise.resolve(defaultDuration)
  }
}
