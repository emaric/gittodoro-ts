import { SessionDataGatewayInterface } from '@/interactor/data-gateways/SessionDataGatewayInterface'
import { SessionCommandInterface } from '@/interactor/requests/SessionCommandInterface'
import { ViewSessionsByRangeRequest } from '@/interactor/requests/SessionRequest'
import { SessionPresenterInterface } from '@/interactor/responses/SessionPresenterInterface'
import { mapSessions } from '@/interactor/use-cases/mapper/EntityResponseMapper'
import { SessionBaseResponse } from '../responses/SessionResponse'

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

  execute(request: ViewSessionsByRangeRequest): void {
    const sessions = this.sessionDataGateway.viewSessionsByRange(
      request.start,
      request.end
    )
    const response: SessionBaseResponse = {
      timestamp: new Date(),
      message: 'View sessions by range.',
      sessions: mapSessions(sessions),
    }
    this.sessionPresenter.present(response)
  }
}
