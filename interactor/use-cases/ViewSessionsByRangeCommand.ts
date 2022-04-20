import { SessionDataGatewayInterface } from '@/interactor/data-gateways/SessionDataGatewayInterface'
import { SessionCommandInterface } from '@/interactor/requests/SessionCommandInterface'
import { ViewSessionsByRangeRequest } from '@/interactor/requests/SessionRequest'
import { SessionPresenterInterface } from '@/interactor/responses/SessionPresenterInterface'
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

  execute(request: ViewSessionsByRangeRequest): void {
    const sessions = this.sessionDataGateway.viewSessionsByRange(
      request.start,
      request.end
    )
    this.sessionPresenter.present(mapSessions(sessions))
  }
}
