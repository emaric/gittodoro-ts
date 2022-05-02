import { SessionController } from '@/controller/SessionController'
import { EndSessionCommand } from '@/interactor/use-cases/EndSessionCommand'
import { StartSessionCommand } from '@/interactor/use-cases/StartSessionCommand'
import { CLIView, SessionCLIPresenter } from './presenter'
import { SessionInMemory } from './db'

export class SessionCLIApp {
  static DEFAULT_DURATION = {
    pomodoro: 25,
    short: 5,
    long: 10,
    longInterval: 4,
  }

  storage: SessionInMemory
  presenter: SessionCLIPresenter
  controller: SessionController

  private startCommand?: StartSessionCommand
  private stopCommand?: EndSessionCommand

  constructor(cliView: CLIView) {
    this.storage = new SessionInMemory([])
    this.presenter = new SessionCLIPresenter(cliView)
    this.controller = new SessionController()
  }

  start(): void {
    if (!this.startCommand) {
      this.startCommand = new StartSessionCommand(this.storage, this.presenter)
    }
    this.startCommand.execute({
      timestamp: new Date(),
      message: 'Start a session',
      start: new Date(),
      ...SessionCLIApp.DEFAULT_DURATION,
    })
  }

  stop(): void {
    if (!this.stopCommand) {
      this.stopCommand = new EndSessionCommand(this.storage, this.presenter)
    }

    this.stopCommand.execute({
      timestamp: new Date(),
      message: 'End a session',
      end: new Date(),
    })
  }
}
