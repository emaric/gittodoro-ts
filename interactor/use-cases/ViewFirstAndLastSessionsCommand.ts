import { SessionCommandInterface } from '@/interactor/requests/SessionCommandInterface'
import { SessionDataGatewayInterface } from '@/interactor/data-gateways/SessionDataGatewayInterface'
import { ViewFirstAndLastSessionsRequest } from '@/interactor/requests/SessionRequest'
import { SessionPresenterInterface } from '@/interactor/responses/SessionPresenterInterface'
import { SessionBaseResponse } from '@/interactor/responses/SessionResponse'
import { mapSessions } from './mapper/EntityResponseMapper'

export class ViewFirstAndLastSessionsCommand
  implements SessionCommandInterface
{
  sessionDataGateway: SessionDataGatewayInterface
  sessionPresenter: SessionPresenterInterface

  constructor(
    sessionDataGateway: SessionDataGatewayInterface,
    sessionPresenter: SessionPresenterInterface
  ) {
    this.sessionDataGateway = sessionDataGateway
    this.sessionPresenter = sessionPresenter
  }

  execute(request: ViewFirstAndLastSessionsRequest): void {
    console.log('view first and last sessions request:', request)
    const firstSession = this.sessionDataGateway.first()
    const lastSession = this.sessionDataGateway.last()
    const response: SessionBaseResponse = {
      timestamp: new Date(),
      message: 'View session details',
      sessions: mapSessions([firstSession, lastSession]),
    }
    this.sessionPresenter.present(response)
  }
}
