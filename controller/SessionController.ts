import { SessionCommandInterface } from '../interactor/requests/SessionCommandInterface'
import {
  DeleteAllRequest,
  EndSessionRequest,
  SaveAllRequest,
  StartSessionRequest,
  ViewFirstAndLastSessionsRequest,
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

  viewFirstAndLastSessions(
    interactor: SessionCommandInterface,
    request: ViewFirstAndLastSessionsRequest
  ) {
    interactor.execute(request)
  }

  saveAllSessions(
    interactor: SessionCommandInterface,
    request: SaveAllRequest
  ) {
    interactor.execute(request)
  }

  deleteAllSessions(
    interactor: SessionCommandInterface,
    request: DeleteAllRequest
  ) {
    interactor.execute(request)
  }
}
