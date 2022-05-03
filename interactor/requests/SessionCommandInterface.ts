import { SessionRequest } from '@/interactor/requests/SessionRequest'
import { SessionBaseResponse } from '../responses/SessionResponse'

export interface SessionCommandInterface {
  execute(request: SessionRequest): Promise<SessionBaseResponse>
}
