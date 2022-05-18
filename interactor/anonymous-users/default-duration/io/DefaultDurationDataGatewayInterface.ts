import { Duration } from '@/interactor/entities/Duration'

export default interface DefaultDurationDataGatewayInterface {
  getDefaultDuration(): Promise<Duration>

  updateDefaultDuration(
    pomodoro: number,
    short: number,
    long: number,
    longInterval: number
  ): Promise<Duration>

  resetDefaultDuration(): Promise<Duration>
}
