import { Duration } from '@/interactor/entities/Duration'

export interface ReadDefaultDurationDataGatewayInterface {
  getDefaultDuration(): Promise<Duration>
}

export interface UpdateDefaultDurationDataGatewayInterface {
  updateDefaultDuration(
    pomodoro: number,
    short: number,
    long: number,
    longInterval: number
  ): Promise<Duration>
}

export interface ResetDefaultDurationDataGatewayInterface {
  resetDefaultDuration(): Promise<Duration>
}
