import Duration from '@/interactor/entities/Duration'

import StopSessionCommand from '@/interactor/anonymous-users/session/StopSessionCommand'
import StartSessionCommand from '@/interactor/anonymous-users/session/StartSessionCommand'
import { CLIView, SessionCLIPresenter } from './presenter'
import { SessionInMemory } from './db'

export class SessionCLIApp {
  static DEFAULT_DURATION = new Duration('0', 25, 5, 10, 4)

  private defaultDurationId: string
  private startInteractor: StartSessionCommand
  private stopInteractor: StopSessionCommand

  constructor(cliView: CLIView) {
    const presenter = new SessionCLIPresenter(cliView)
    const db = new SessionInMemory({
      session: [],
      duration: [SessionCLIApp.DEFAULT_DURATION],
    })
    this.defaultDurationId = SessionCLIApp.DEFAULT_DURATION.id

    this.startInteractor = new StartSessionCommand(db, presenter)
    this.stopInteractor = new StopSessionCommand(db, presenter)
  }

  start(): void {
    this.startInteractor.execute({
      start: new Date(),
      durationId: this.defaultDurationId,
    })
  }

  stop(): void {
    this.stopInteractor.execute({
      date: new Date(),
    })
  }
}
