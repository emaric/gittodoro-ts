import DefaultDurationError from './error/DefaultDurationError'

import { ResetDefaultDurationResponse } from './io/response.model'
import DefaultDurationCommandInterface from './io/DefaultDurationCommandInterface'
import DefaultDurationDataGatewayInterface from './io/DefaultDurationDataGatewayInterface'
import DefaultDurationPresenterInterface from './io/DefaultDurationPresenterInterface'
import { mapDurationToResponse } from './io/mappers'

export default class ResetDefaultDurationCommand
  implements DefaultDurationCommandInterface
{
  private dataGateway: DefaultDurationDataGatewayInterface
  private presenter: DefaultDurationPresenterInterface

  constructor(
    dataGateway: DefaultDurationDataGatewayInterface,
    presenter: DefaultDurationPresenterInterface
  ) {
    this.dataGateway = dataGateway
    this.presenter = presenter
  }
  async execute(): Promise<ResetDefaultDurationResponse> {
    try {
      const duration = await this.dataGateway.resetDefaultDuration()
      const response = {
        duration: mapDurationToResponse(duration),
      }
      this.presenter.present(response)
      return Promise.resolve(response)
    } catch (error) {
      return Promise.reject([
        error,
        new DefaultDurationError(
          'Error encountered while trying to reset the default duration.'
        ),
      ])
    }
  }
}
