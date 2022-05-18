import DefaultDurationError from './error/DefaultDurationError'

import { mapDurationToResponse } from './io/mapper'
import { UpdateDefaultDurationRequest } from './io/request.model'
import { UpdateDefaultDurationResponse } from './io/response.model'
import DefaultDurationPresenterInterface from './io/DefaultDurationPresenterInterface'
import DefaultDurationCommandInterface from './io/DefaultDurationCommandInterface'
import { UpdateDefaultDurationDataGatewayInterface } from './io/data.gateway'

export default class UpdateDefaultDurationCommand
  implements DefaultDurationCommandInterface
{
  private dataGateway: UpdateDefaultDurationDataGatewayInterface
  private presenter: DefaultDurationPresenterInterface

  constructor(
    dataGateway: UpdateDefaultDurationDataGatewayInterface,
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
