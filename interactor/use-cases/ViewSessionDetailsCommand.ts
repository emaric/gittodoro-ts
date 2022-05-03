import { SessionDataGatewayInterface } from '@/interactor/data-gateways/SessionDataGatewayInterface'

import { SessionCommandInterface } from '@/interactor/requests/SessionCommandInterface'
import { ViewSessionRequest } from '@/interactor/requests/SessionRequest'

import { SessionPresenterInterface } from '@/interactor/responses/SessionPresenterInterface'
import { SessionBaseResponse } from '@/interactor/responses/SessionResponse'

import { mapSession } from '@/interactor/use-cases/mapper/EntityResponseMapper'

export class ViewSessionDetailsCommand implements SessionCommandInterface {
  sessionDataGateway: SessionDataGatewayInterface
  sessionPresenter: SessionPresenterInterface

  constructor(
    sessionDataGateway: SessionDataGatewayInterface,
    sessionPresenter: SessionPresenterInterface
  ) {
    this.sessionDataGateway = sessionDataGateway
    this.sessionPresenter = sessionPresenter
  }

  async execute(request: ViewSessionRequest): Promise<SessionBaseResponse> {
    const session = await this.sessionDataGateway.readSession(request.start)
    const response: SessionBaseResponse = {
      timestamp: new Date(),
      message: 'View session details',
      session: mapSession(session),
    }
    return new Promise((resolve) => {
      this.sessionPresenter.present(response)
      resolve(response)
    })
  }
}
