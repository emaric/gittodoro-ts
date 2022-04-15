import { DurationRequest } from './DurationRequest'

export interface DurationCommandInterface {
  execute(request: DurationRequest): void
}
