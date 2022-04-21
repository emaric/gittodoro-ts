import { SessionDataGatewayInterface } from '@/interactor/data-gateways/SessionDataGatewayInterface'
import { EndSessionRequest } from '@/interactor/requests/SessionRequest'
import { SessionCommandInterface } from '@/interactor/requests/SessionCommandInterface'
import { SessionPresenterInterface } from '@/interactor/responses/SessionPresenterInterface'
import { mapSession } from './mapper/EntityResponseMapper'
import { SessionBaseResponse } from '../responses/SessionResponse'

export class EndSessionCommand implements SessionCommandInterface {
  sessionDataGateway: SessionDataGatewayInterface
  sessionPresenter: SessionPresenterInterface

  constructor(
    sessionDataGateway: SessionDataGatewayInterface,
    sessionPresenter: SessionPresenterInterface
  ) {
    this.sessionDataGateway = sessionDataGateway
    this.sessionPresenter = sessionPresenter
  }

  execute(request: EndSessionRequest): void {
    const session = this.sessionDataGateway.endSession(request.end)
    const response: SessionBaseResponse = {
      timestamp: new Date(),
      message: 'End session',
      session: mapSession(session),
    }
    this.sessionPresenter.present(response)
  }
}
