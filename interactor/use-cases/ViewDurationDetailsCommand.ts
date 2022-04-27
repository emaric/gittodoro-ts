import { DurationDataGatewayInterface } from '@/interactor/data-gateways/DurationDataGatewayInterface'
import { DurationCommandInterface } from '@/interactor/requests/DurationCommandInterface'
import { DurationRequest } from '@/interactor/requests/DurationRequest'
import { DurationPresenterInterface } from '@/interactor/responses/DurationPresenterInterface'
import { DurationBaseResponse } from '../responses/DurationResponse'

export class ViewDurationDetailsCommand implements DurationCommandInterface {
  dataGateway: DurationDataGatewayInterface
  presenter: DurationPresenterInterface

  constructor(
    dataGateway: DurationDataGatewayInterface,
    presenter: DurationPresenterInterface
  ) {
    this.dataGateway = dataGateway
    this.presenter = presenter
  }

  execute(request: DurationRequest): void {
    console.log(request)
    const duration = this.dataGateway.getDefaultDuration()
    const response: DurationBaseResponse = {
      timestamp: new Date(),
      message: 'View Duration Response',
      duration,
    }
    this.presenter.present(response)
  }
}
