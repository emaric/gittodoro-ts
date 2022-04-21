import { SessionCommandInterface } from '../interactor/requests/SessionCommandInterface'
import {
  EndSessionRequest,
  StartSessionRequest,
  ViewSessionRequest,
  ViewSessionsByRangeRequest,
} from '../interactor/requests/SessionRequest'

export class SessionController {
  startSession(
    interactor: SessionCommandInterface,
    request: StartSessionRequest
  ): void {
    interactor.execute(request)
  }

  endSession(
    interactor: SessionCommandInterface,
    request: EndSessionRequest
  ): void {
    interactor.execute(request)
  }

  viewSession(
    interactor: SessionCommandInterface,
    request: ViewSessionRequest
  ): void {
    interactor.execute(request)
  }

  viewSessionsByRange(
    interactor: SessionCommandInterface,
    request: ViewSessionsByRangeRequest
  ) {
    interactor.execute(request)
  }
}
