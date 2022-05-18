import DefaultDurationError from './error/DefaultDurationError'

import { mapDurationToResponse } from './io/mappers'
import { UpdateDefaultDurationRequest } from './io/request.model'
import { UpdateDefaultDurationResponse } from './io/response.model'
import DefaultDurationDataGatewayInterface from './io/DefaultDurationDataGatewayInterface'
import DefaultDurationPresenterInterface from './io/DefaultDurationPresenterInterface'
import DefaultDurationCommandInterface from './io/DefaultDurationCommandInterface'

export default class UpdateDefaultDurationCommand
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

  async execute(
    request: UpdateDefaultDurationRequest
  ): Promise<UpdateDefaultDurationResponse> {
    try {
      const duration = await this.dataGateway.updateDefaultDuration(
        request.pomodoro,
        request.short,
        request.long,
        request.longInterval
      )
      const response = {
        duration: mapDurationToResponse(duration),
      }
      this.presenter.present(response)
      return Promise.resolve(response)
    } catch (error) {
      return Promise.reject([
        error,
        new DefaultDurationError(
          'Error encountered while trying to update the default duration.'
        ),
      ])
    }
  }
}
