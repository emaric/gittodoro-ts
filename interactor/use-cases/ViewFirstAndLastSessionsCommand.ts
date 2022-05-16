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
    try {
      const firstSession = await this.sessionDataGateway.first()
      const lastSession = await this.sessionDataGateway.last()

      const sessions = []
      firstSession && sessions.push(firstSession)
      lastSession && sessions.push(lastSession)

      const response: SessionBaseResponse = {
        timestamp: new Date(),
        message: 'View first and last sessions',
        sessions: mapSessions(sessions),
      }

      return new Promise((resolve) => {
        resolve(response)
        this.sessionPresenter.present(response)
      })
    } catch (error) {
      const response: SessionBaseResponse = {
        timestamp: new Date(),
        message:
          'Error getting first and last sessions. Request made @ ' +
          request.timestamp,
      }
      return Promise.resolve(response)
    }
  }
}
