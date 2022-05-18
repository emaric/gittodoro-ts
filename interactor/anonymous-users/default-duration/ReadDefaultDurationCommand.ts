import DefaultDurationError from './error/DefaultDurationError'

import { mapDurationToResponse } from './io/mappers'
import { ReadDefaultDurationResponse } from './io/response.model'
import DefaultDurationPresenterInterface from './io/DefaultDurationPresenterInterface'
import DefaultDurationCommandInterface from './io/DefaultDurationCommandInterface'
import { ReadDefaultDurationDataGatewayInterface } from './io/data.gateway'

export default class ReadDefaultDurationCommand
  implements DefaultDurationCommandInterface
{
  private dataGateway: ReadDefaultDurationDataGatewayInterface
  private presenter: DefaultDurationPresenterInterface

  constructor(
    dataGateway: ReadDefaultDurationDataGatewayInterface,
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
