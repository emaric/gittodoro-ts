import SessionError from './error/SessionError'
import { ReadFirstSessionGatewayInterface } from './io/data.gateway'
import { ReadFirstSessionResponse } from './io/response.model'
import SessionCommandInterface from './io/SessionCommandInterface'
import SessionPresenterInterface from './io/SessionPresenterInterface'

export default class ReadFirstSessionCommand
  implements SessionCommandInterface
{
  private dataGateway: ReadFirstSessionGatewayInterface
  private presenter: SessionPresenterInterface

  constructor(
    dataGateway: ReadFirstSessionGatewayInterface,
    presenter: SessionPresenterInterface
  ) {
    this.dataGateway = dataGateway
    this.presenter = presenter
  }
  async execute(): Promise<ReadFirstSessionResponse> {
    try {
      const session = await this.dataGateway.first()
      const response = {
        session,
      }
      await this.presenter.present(response)
      return response
    } catch (error) {
      throw new SessionError(
        'Failed to read the first session.',
        error as Error
      )
    }
  }
}
