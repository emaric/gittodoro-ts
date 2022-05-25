import DefaultDurationError from './error/DefaultDurationError'

import { mapDurationToResponse } from './io/mapper'
import { UpdateDefaultDurationRequest } from './io/request.model'
import { UpdateDefaultDurationResponse } from './io/response.model'
import DefaultDurationPresenterInterface from './io/DefaultDurationPresenterInterface'
import { UpdateDefaultDurationDataGatewayInterface } from './io/data.gateway'
import DefaultDurationCommandAbstract from './io/DefaultDurationCommandAbstract'

export default class UpdateDefaultDurationCommand extends DefaultDurationCommandAbstract {
  private dataGateway: UpdateDefaultDurationDataGatewayInterface
  private presenter: DefaultDurationPresenterInterface

  constructor(
    dataGateway: UpdateDefaultDurationDataGatewayInterface,
    presenter: DefaultDurationPresenterInterface
  ) {
    super()
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
        request.interval
      )
      this.validate(duration)
      const response = {
        duration: mapDurationToResponse(duration),
      }
      await this.presenter.present(response)
      return Promise.resolve(response)
    } catch (error) {
      return Promise.reject(
        new DefaultDurationError(
          'Error encountered while trying to update the default duration.',
          error as Error
        )
      )
    }
  }
}
