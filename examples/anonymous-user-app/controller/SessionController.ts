import {
  EndSessionRequest,
  StartSessionRequest,
  ViewSessionRequest,
  ViewSessionsByRangeRequest,
} from '@/interactor/requests/SessionRequest'
import { EndSessionCommand } from '@/interactor/use-cases/EndSessionCommand'
import { StartSessionCommand } from '@/interactor/use-cases/StartSessionCommand'
import { ViewSessionDetailsCommand } from '@/interactor/use-cases/ViewSessionDetailsCommand'
import { ViewSessionsByRangeCommand } from '@/interactor/use-cases/ViewSessionsByRangeCommand'

export default class SessionController {
  start(interactor: StartSessionCommand, request: StartSessionRequest) {
    return interactor.execute(request)
  }

  stop(interactor: EndSessionCommand, request: EndSessionRequest) {
    return interactor.execute(request)
  }

  getByStartDate(
    interactor: ViewSessionDetailsCommand,
    request: ViewSessionRequest
  ) {
    return interactor.execute(request)
  }

  getByRange(
    interactor: ViewSessionsByRangeCommand,
    request: ViewSessionsByRangeRequest
  ) {
    return interactor.execute(request)
  }
}
