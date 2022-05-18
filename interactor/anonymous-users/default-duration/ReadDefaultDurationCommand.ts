import DefaultDurationError from './error/DefaultDurationError'

import { mapDurationToResponse } from './io/mappers'
import { ReadDefaultDurationResponse } from './io/response.model'
import DefaultDurationDataGatewayInterface from './io/DefaultDurationDataGatewayInterface'
import DefaultDurationPresenterInterface from './io/DefaultDurationPresenterInterface'
import DefaultDurationCommandInterface from './io/DefaultDurationCommandInterface'

export default class ReadDefaultDurationCommand
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

  async execute(): Promise<ReadDefaultDurationResponse> {
    try {
      const duration = await this.dataGateway.getDefaultDuration()
      const response = {
        duration: duration ? mapDurationToResponse(duration) : undefined,
      }
      this.presenter.present(response)
      return Promise.resolve(response)
    } catch (error) {
      return Promise.reject([
        error,
        new DefaultDurationError(
          'Error encountered while trying to get the default duration from the data gateway.'
        ),
      ])
    }
  }
}
