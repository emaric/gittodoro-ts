import { DurationBaseResponse } from './DurationResponse'

export interface DurationPresenterInterface {
  present(duration: DurationBaseResponse): Promise<unknown>
}
