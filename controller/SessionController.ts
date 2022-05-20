import {
  StartSessionRequest,
  StopSessionRequest,
} from '@/interactor/anonymous-users/session/io/request.model'
import SessionCommandInterface from '@/interactor/anonymous-users/session/io/SessionCommandInterface'

export interface SessionInteractorFactoryInterface {
  start(): SessionCommandInterface
  stop(): SessionCommandInterface
}

export class SessionController {
  private interactorFactory: SessionInteractorFactoryInterface

  constructor(interactorFactory: SessionInteractorFactoryInterface) {
    this.interactorFactory = interactorFactory
  }

  start(request: StartSessionRequest) {
    this.interactorFactory.start().execute(request)
  }

  stop(request: StopSessionRequest) {
    return this.interactorFactory.stop().execute(request)
  }
}
