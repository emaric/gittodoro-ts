import DurationConstraintsValidator from '@/interactor/validators/DurationConstraintsValidator'
import Duration from '@/interactor/entities/Duration'

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
  private requestValidator: DurationConstraintsValidator

  constructor(
    dataGateway: UpdateDefaultDurationDataGatewayInterface,
    presenter: DefaultDurationPresenterInterface
  ) {
    super()
    this.dataGateway = dataGateway
    this.presenter = presenter
    this.requestValidator = new DurationConstraintsValidator()
  }

  async execute(
    request: UpdateDefaultDurationRequest
  ): Promise<UpdateDefaultDurationResponse> {
    try {
      await this.validateRequest(request)

      const duration = await this.dataGateway.updateDefaultDuration(
        request.pomodoro,
        request.short,
        request.long,
        request.interval
      )

      await this.validate(duration)
      const response = {
        duration: mapDurationToResponse(duration),
      }
      await this.presenter.present(response)
      return response
    } catch (error) {
      throw new DefaultDurationError(
        'Error encountered while trying to update the default duration.',
        error as Error
      )
    }
  }

  private async validateRequest(request: UpdateDefaultDurationRequest) {
    const duration = new Duration(
      'REQUEST DURATION ID',
      request.pomodoro,
      request.short,
      request.long,
      request.interval
    )
    try {
      return await this.requestValidator.validate(duration)
    } catch (error) {
      throw new DefaultDurationError('Invalid request value.', error as Error)
    }
  }
}
