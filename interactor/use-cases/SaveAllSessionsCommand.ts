import { SessionDataGatewayInterface } from '@/interactor/data-gateways/SessionDataGatewayInterface'
import { SessionCommandInterface } from '@/interactor/requests/SessionCommandInterface'
import { SaveAllRequest } from '@/interactor/requests/SessionRequest'
import { SessionPresenterInterface } from '@/interactor/responses/SessionPresenterInterface'
import { SessionBaseResponse } from '@/interactor/responses/SessionResponse'
import { mapRequestsToSessions } from '@/interactor/use-cases/mapper/RequestEntityMapper'
import { mapSessions } from './mapper/EntityResponseMapper'

export class SaveAllSessionsCommand implements SessionCommandInterface {
  private dataGateway: SessionDataGatewayInterface
  private presenter: SessionPresenterInterface

  constructor(
    dataGateway: SessionDataGatewayInterface,
    presenter: SessionPresenterInterface
  ) {
    this.dataGateway = dataGateway
    this.presenter = presenter
  }

  async execute(request: SaveAllRequest): Promise<SessionBaseResponse> {
    const sessions = mapRequestsToSessions(request.sessions)
    const savedSessions = await this.dataGateway.saveSessions(sessions)
    const response: SessionBaseResponse = {
      timestamp: new Date(),
      message: 'Successfully saved all sessions.',
      sessions: mapSessions(savedSessions),
    }

    return new Promise((resolve) => {
      this.presenter.present(response)
      resolve(response)
    })
  }
}
