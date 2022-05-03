import { SessionDataGatewayInterface } from '@/interactor/data-gateways/SessionDataGatewayInterface'

import { SessionCommandInterface } from '@/interactor/requests/SessionCommandInterface'
import { ViewSessionsByRangeRequest } from '@/interactor/requests/SessionRequest'

import { SessionPresenterInterface } from '@/interactor/responses/SessionPresenterInterface'
import { SessionBaseResponse } from '@/interactor/responses/SessionResponse'

import { mapSessions } from '@/interactor/use-cases/mapper/EntityResponseMapper'

export class ViewSessionsByRangeCommand implements SessionCommandInterface {
  sessionDataGateway: SessionDataGatewayInterface
  sessionPresenter: SessionPresenterInterface

  constructor(
    sessionDataGateway: SessionDataGatewayInterface,
    sessionPresenter: SessionPresenterInterface
  ) {
    this.sessionDataGateway = sessionDataGateway
    this.sessionPresenter = sessionPresenter
  }

  async execute(
    request: ViewSessionsByRangeRequest
  ): Promise<SessionBaseResponse> {
    const sessions = await this.sessionDataGateway.viewSessionsByRange(
      request.start,
      request.end
    )
    const response: SessionBaseResponse = {
      timestamp: new Date(),
      message: 'View sessions by range.',
      sessions: mapSessions(sessions),
    }

    return new Promise((resolve) => {
      this.sessionPresenter.present(response)
      resolve(response)
    })
  }
}
