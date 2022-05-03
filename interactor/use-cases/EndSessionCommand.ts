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

  async execute(request: EndSessionRequest): Promise<SessionBaseResponse> {
    const session = await this.sessionDataGateway.endSession(request.end)
    const response: SessionBaseResponse = {
      timestamp: new Date(),
      message: 'End session',
      session: mapSession(session),
    }
    return new Promise((resolve) => {
      this.sessionPresenter.present(response)
      resolve(response)
    })
  }
}
