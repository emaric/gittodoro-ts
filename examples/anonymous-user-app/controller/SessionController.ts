import {
  StartSessionRequest,
  StopSessionRequest,
} from '@/interactor/anonymous-users/session/io/request.model'
import StartSessionCommand from '@/interactor/anonymous-users/session/StartSessionCommand'
import StopSessionCommand from '@/interactor/anonymous-users/session/StopSessionCommand'

export default class SessionController {
  start(interactor: StartSessionCommand, request: StartSessionRequest) {
    return interactor.execute(request)
  }

  stop(interactor: StopSessionCommand, request: StopSessionRequest) {
    return interactor.execute(request)
  }
}
