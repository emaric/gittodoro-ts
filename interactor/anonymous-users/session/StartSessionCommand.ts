import SessionError from './error/SessionError'
import { StartSessionGatewayInterface } from './io/data.gateway'
import { mapSessionToResponse } from './io/mapper'
import { StartSessionRequest } from './io/request.model'
import { StartSessionResponse } from './io/response.model'
import SessionCommandInterface from './io/SessionCommandInterface'
import SessionPresenterInterface from './io/SessionPresenterInterface'

export default class StartSessionCommand implements SessionCommandInterface {
  private dataGateway: StartSessionGatewayInterface
  private presenter: SessionPresenterInterface

  constructor(
    dataGateway: StartSessionGatewayInterface,
    presenter: SessionPresenterInterface
  ) {
    this.dataGateway = dataGateway
    this.presenter = presenter
  }

  async execute(request: StartSessionRequest): Promise<StartSessionResponse> {
    try {
      const session = await this.dataGateway.start(
        request.start,
        request.durationId
      )
      const response = {
        session: mapSessionToResponse(session),
      }
      this.presenter.present(response)
      return Promise.resolve(response)
    } catch (error) {
      return Promise.reject([
        error,
        new SessionError('Error encountered while trying to start a Session.'),
      ])
    }
  }
}
