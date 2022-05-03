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

  async execute(request: DurationRequest): Promise<DurationBaseResponse> {
    console.log(request)
    const duration = await this.dataGateway.getDefaultDuration()
    const response: DurationBaseResponse = {
      timestamp: new Date(),
      message: 'View Duration Response',
      duration,
    }
    return new Promise((resolve) => {
      this.presenter.present(response)
      resolve(response)
    })
  }
}
