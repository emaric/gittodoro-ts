import { SessionDataGatewayInterface } from '@/interactor/data-gateways/SessionDataGatewayInterface'
import { SessionCommandInterface } from '@/interactor/requests/SessionCommandInterface'
import { ViewSessionRequest } from '@/interactor/requests/SessionRequest'
import { SessionPresenterInterface } from '@/interactor/responses/SessionPresenterInterface'
import { mapSession } from './mapper/EntityResponseMapper'

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

  execute(request: ViewSessionRequest): void {
    const session = this.sessionDataGateway.readSession(request.start)
    this.sessionPresenter.present(mapSession(session))
  }
}
