import { SessionResponse } from '@/interactor/responses/SessionResponse'

export interface SessionPresenterInterface {
  present(response: SessionResponse): void
}
