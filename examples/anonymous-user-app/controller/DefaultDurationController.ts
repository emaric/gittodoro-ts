import DefaultDurationCommandInterface from '@/interactor/anonymous-users/default-duration/io/DefaultDurationCommandInterface'
import { UpdateDefaultDurationRequest } from '@/interactor/anonymous-users/default-duration/io/request.model'

export default class DurationController {
  getDefault(interactor: DefaultDurationCommandInterface) {
    return interactor.execute()
  }

  setDefault(
    interactor: DefaultDurationCommandInterface,
    request: UpdateDefaultDurationRequest
  ) {
    return interactor.execute(request)
  }

  resetDefault(interactor: DefaultDurationCommandInterface) {
    return interactor.execute()
  }
}
