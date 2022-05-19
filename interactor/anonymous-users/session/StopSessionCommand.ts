import SessionError from './error/SessionError'

import { StopSessionGatewayInterface } from './io/data.gateway'
import { mapSessionToResponse } from './io/mapper'
import { StopSessionRequest } from './io/request.model'
import { StopSessionResponse } from './io/response.model'
import SessionCommandInterface from './io/SessionCommandInterface'
import SessionPresenterInterface from './io/SessionPresenterInterface'

export default class StopSessionCommand implements SessionCommandInterface {
  private dataGateway: StopSessionGatewayInterface
  private presenter: SessionPresenterInterface

  constructor(
    dataGateway: StopSessionGatewayInterface,
    presenter: SessionPresenterInterface
  ) {
    this.dataGateway = dataGateway
    this.presenter = presenter
  }

  async execute(request: StopSessionRequest): Promise<StopSessionResponse> {
    try {
      const session = await this.dataGateway.stop(request.date)
      const response = {
        session: session ? mapSessionToResponse(session) : undefined,
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
