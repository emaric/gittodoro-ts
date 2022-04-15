import { Duration } from '@/interactor/entities/Duration'

export interface DurationDataGatewayInterface {
  getDefaultDuration(): Duration
}
