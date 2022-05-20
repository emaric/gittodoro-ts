import {
  SessionController,
  SessionInteractorFactoryInterface,
} from '@/controller/SessionController'
import StopSessionCommand from '@/interactor/anonymous-users/session/StopSessionCommand'
import StartSessionCommand from '@/interactor/anonymous-users/session/StopSessionCommand'
import { CLIView, SessionCLIPresenter } from './presenter'
import { SessionInMemory } from './db'
import {
  StartSessionGatewayInterface,
  StopSessionGatewayInterface,
} from '@/interactor/anonymous-users/session/io/data.gateway'
import SessionPresenterInterface from '@/interactor/anonymous-users/session/io/SessionPresenterInterface'

export class SessionInteractorFactory
  implements SessionInteractorFactoryInterface
{
  private dataGateway: StartSessionGatewayInterface &
    StopSessionGatewayInterface
  private presenter: SessionPresenterInterface

  private startCommand?: StartSessionCommand
  private stopCommand?: StopSessionCommand

  constructor(
    dataGateway: StartSessionGatewayInterface & StopSessionGatewayInterface,
    presenter: SessionPresenterInterface
  ) {
    this.dataGateway = dataGateway
    this.presenter = presenter
  }

  start(): StartSessionCommand {
    if (this.startCommand) {
      return this.startCommand
    }
    this.startCommand = new StartSessionCommand(
      this.dataGateway,
      this.presenter
    )
    return this.startCommand
  }
  stop(): StopSessionCommand {
    if (this.stopCommand) {
      return this.stopCommand
    }
    this.stopCommand = new StopSessionCommand(this.dataGateway, this.presenter)
    return this.stopCommand
  }
}

export class SessionCLIApp {
  static DEFAULT_DURATION = {
    id: '0',
    pomodoro: 25,
    short: 5,
    long: 10,
    longInterval: 4,
  }

  private defaultDurationId: string
  controller: SessionController

  constructor(cliView: CLIView) {
    const presenter = new SessionCLIPresenter(cliView)
    const db = new SessionInMemory({
      session: [],
      duration: [SessionCLIApp.DEFAULT_DURATION],
    })
    const interactorFactory = new SessionInteractorFactory(db, presenter)
    this.controller = new SessionController(interactorFactory)
    this.defaultDurationId = SessionCLIApp.DEFAULT_DURATION.id
  }

  start(): void {
    this.controller.start({
      start: new Date(),
      durationId: this.defaultDurationId,
    })
  }

  stop(): void {
    this.controller.stop({
      date: new Date(),
    })
  }
}
