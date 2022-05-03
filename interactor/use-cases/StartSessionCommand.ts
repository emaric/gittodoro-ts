import { SessionDataGatewayInterface } from '@/interactor/data-gateways/SessionDataGatewayInterface'
import { SessionCommandInterface } from '@/interactor/requests/SessionCommandInterface'
import { StartSessionRequest } from '@/interactor/requests/SessionRequest'
import { SessionPresenterInterface } from '@/interactor/responses/SessionPresenterInterface'
import { mapSession } from '@/interactor/use-cases/mapper/EntityResponseMapper'
import { SessionBaseResponse } from '../responses/SessionResponse'

export class StartSessionCommand implements SessionCommandInterface {
  sessionDataGateway: SessionDataGatewayInterface
  sessionPresenter: SessionPresenterInterface

  constructor(
    sessionDataGateway: SessionDataGatewayInterface,
    sessionPresenter: SessionPresenterInterface
  ) {
    this.sessionDataGateway = sessionDataGateway
    this.sessionPresenter = sessionPresenter
  }

  async execute(request: StartSessionRequest): Promise<SessionBaseResponse> {
    const session = await this.sessionDataGateway.createSession({ ...request })
    const response: SessionBaseResponse = {
      timestamp: new Date(),
      message: 'Start session',
      session: mapSession(session),
    }

    return new Promise((resolve) => {
      this.sessionPresenter.present(response)
      resolve(response)
    })
  }
}
