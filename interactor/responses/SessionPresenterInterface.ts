import { SessionBaseResponse } from '@/interactor/responses/SessionResponse'

export interface SessionPresenterInterface {
  present(response: SessionBaseResponse): void
}
