import { SessionDataGatewayInterface } from '@/interactor/data-gateways/SessionDataGatewayInterface'
import { SessionCommandInterface } from '@/interactor/requests/SessionCommandInterface'
import { DeleteAllRequest } from '@/interactor/requests/SessionRequest'
import { SessionPresenterInterface } from '@/interactor/responses/SessionPresenterInterface'
import { SessionBaseResponse } from '@/interactor/responses/SessionResponse'
import { mapSessions } from '@/interactor/use-cases/mapper/EntityResponseMapper'

export class DeleteAllSessionsCommand implements SessionCommandInterface {
  private dateGateway: SessionDataGatewayInterface
  private presenter: SessionPresenterInterface

  constructor(
    dataGateway: SessionDataGatewayInterface,
    presenter: SessionPresenterInterface
  ) {
    this.dateGateway = dataGateway
    this.presenter = presenter
  }

  async execute(request: DeleteAllRequest): Promise<SessionBaseResponse> {
    const deletedSessions = await this.dateGateway.deleteSessions(request.ids)
    const response: SessionBaseResponse = {
      timestamp: new Date(),
      message: 'Successfully deleted following sessions.',
      sessions: mapSessions(deletedSessions),
    }

    return new Promise((resolve) => {
      this.presenter.present(response)
      resolve(response)
    })
  }
}
