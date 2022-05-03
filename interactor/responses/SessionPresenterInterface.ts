import { SessionBaseResponse } from '@/interactor/responses/SessionResponse'

export interface SessionPresenterInterface {
  present(response: SessionBaseResponse): Promise<unknown>
}
