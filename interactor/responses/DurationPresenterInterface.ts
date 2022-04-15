import { DurationResponse } from './DurationResponse'

export interface DurationPresenterInterface {
  present(duration: DurationResponse): void
}
