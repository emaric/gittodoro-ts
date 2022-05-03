import { DurationBaseResponse } from '../responses/DurationResponse'
import { DurationRequest } from './DurationRequest'

export interface DurationCommandInterface {
  execute(request: DurationRequest): Promise<DurationBaseResponse>
}
