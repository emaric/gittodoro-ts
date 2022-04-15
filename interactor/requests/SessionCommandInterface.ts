import { SessionRequest } from '../../interactor/requests/SessionRequest'

export interface SessionCommandInterface {
  execute(request: SessionRequest): void
}
