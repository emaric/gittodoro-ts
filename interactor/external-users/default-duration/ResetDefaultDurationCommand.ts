import DefaultDurationError from './error/DefaultDurationError'

import { ResetDefaultDurationResponse } from './io/response.model'
import DefaultDurationPresenterInterface from './io/DefaultDurationPresenterInterface'
import { mapDurationToResponse } from './io/mapper'
import { ResetDefaultDurationDataGatewayInterface } from './io/data.gateway'
import DefaultDurationCommandAbstract from './io/DefaultDurationCommandAbstract'

export default class ResetDefaultDurationCommand extends DefaultDurationCommandAbstract {
  private dataGateway: ResetDefaultDurationDataGatewayInterface
  private presenter: DefaultDurationPresenterInterface

  constructor(
    dataGateway: ResetDefaultDurationDataGatewayInterface,
    presenter: DefaultDurationPresenterInterface
  ) {
    super()
    this.dataGateway = dataGateway
    this.presenter = presenter
  }
  async execute(): Promise<ResetDefaultDurationResponse> {
    try {
      const duration = await this.dataGateway.resetDefaultDuration()
      this.validate(duration)
      const response = {
        duration: mapDurationToResponse(duration),
      }
      await this.presenter.present(response)
      return Promise.resolve(response)
    } catch (error) {
      return Promise.reject(
        new DefaultDurationError(
          'Error encountered while trying to reset the default duration.',
          error as Error
        )
      )
    }
  }
}
