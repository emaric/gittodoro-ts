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

  async execute(
    request: ViewFirstAndLastSessionsRequest
  ): Promise<SessionBaseResponse> {
    const firstSession = await this.sessionDataGateway.first()
    const lastSession = await this.sessionDataGateway.last()

    const sessions = []
    firstSession && sessions.push(firstSession)
    lastSession && sessions.push(lastSession)

    const response: SessionBaseResponse = {
      timestamp: new Date(),
      message: 'View session details',
      sessions: sessions ? mapSessions(sessions) : [],
    }

    this.sessionPresenter.present(response)
    return new Promise((resolve) => {
      resolve(response)
      this.sessionPresenter.present(response)
    })
  }
}
