import DefaultDurationDataGatewayInterface from '@/interactor/anonymous-users/default-duration/io/DefaultDurationDataGatewayInterface'
import { defaultDuration, Duration } from '@/interactor/entities/Duration'

export default class DefaultDurationInMemory
  implements DefaultDurationDataGatewayInterface
{
  private storage: Duration[]
  private defaultDurationId

  constructor() {
    this.storage = [defaultDuration]
    this.defaultDurationId = this.storage[0].id
  }

  getDefaultDuration(): Promise<Duration> {
    const duration = this.storage.find(
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
    const duplicate = this.storage.find(
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
      const duration = new Duration({
        id: String(this.storage.length),
        pomodoro,
        short,
        long,
        longInterval,
      })
      this.storage.push(duration)
      this.defaultDurationId = duration.id
      return Promise.resolve(duration)
    }
  }

  resetDefaultDuration(): Promise<Duration> {
    this.defaultDurationId = defaultDuration.id
    return Promise.resolve(defaultDuration)
  }
}
