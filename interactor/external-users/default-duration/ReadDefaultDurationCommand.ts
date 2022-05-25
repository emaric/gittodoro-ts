import DefaultDurationError from './error/DefaultDurationError'

import { mapDurationToResponse } from './io/mapper'
import { ReadDefaultDurationResponse } from './io/response.model'
import DefaultDurationPresenterInterface from './io/DefaultDurationPresenterInterface'
import { ReadDefaultDurationDataGatewayInterface } from './io/data.gateway'
import DefaultDurationCommandAbstract from './io/DefaultDurationCommandAbstract'

export default class ReadDefaultDurationCommand extends DefaultDurationCommandAbstract {
  private dataGateway: ReadDefaultDurationDataGatewayInterface
  private presenter: DefaultDurationPresenterInterface

  constructor(
    dataGateway: ReadDefaultDurationDataGatewayInterface,
    presenter: DefaultDurationPresenterInterface
  ) {
    super()
    this.dataGateway = dataGateway
    this.presenter = presenter
  }

  async execute(): Promise<ReadDefaultDurationResponse> {
    try {
      const duration = await this.dataGateway.getDefaultDuration()
      this.validate(duration)
      const response = {
        duration: mapDurationToResponse(duration),
      }
      await this.presenter.present(response)
      return Promise.resolve(response)
    } catch (error) {
      return Promise.reject(
        new DefaultDurationError(
          'Error encountered while trying to get the default duration from the data gateway.',
          error as Error
        )
      )
    }
  }
}
