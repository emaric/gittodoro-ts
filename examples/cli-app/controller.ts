import Duration from '@/interactor/entities/Duration'

import StopSessionCommand from '@/interactor/anonymous-users/session/StopSessionCommand'
import StartSessionCommand from '@/interactor/anonymous-users/session/StartSessionCommand'
import { CLIView, RecordCLIPresenter, SessionCLIPresenter } from './presenter'
import { SessionInMemory } from './db'
import CreateRecordCommand from '@/interactor/record-timer-system/CreateRecordCommand'
import { CreateRecordRequest } from '@/interactor/record-timer-system/io/request.model'
import { Session } from './models/Session'
import { RecordCLIView } from './view'

export const DEFAULT_DURATION = new Duration(
  '0',
  25 * 1000,
  5 * 1000,
  10 * 1000,
  4
)
const db = new SessionInMemory({
  session: [],
  duration: [DEFAULT_DURATION],
})

export class SessionCLIApp {
  private defaultDurationId: string
  private startInteractor: StartSessionCommand
  private stopInteractor: StopSessionCommand

  constructor(cliView: CLIView) {
    const presenter = new SessionCLIPresenter(cliView)
    this.defaultDurationId = DEFAULT_DURATION.id
    this.startInteractor = new StartSessionCommand(db, presenter)
    this.stopInteractor = new StopSessionCommand(db, presenter)
  }

  async start() {
    await this.startInteractor.execute({
      start: new Date(),
      durationId: this.defaultDurationId,
    })
  }

  async stop() {
    await this.stopInteractor.execute({
      date: new Date(),
    })
  }
}

export class RecordController {
  private view: RecordCLIView
  private createInteractor: CreateRecordCommand

  constructor(view: RecordCLIView) {
    this.view = view
    const presenter = new RecordCLIPresenter(view)
    this.createInteractor = new CreateRecordCommand(presenter)
  }

  createRecord(session: Session) {
    const request: CreateRecordRequest = {
      duration: { ...session, id: '0' },
      start: session.start,
      current: new Date(),
    }
    this.createInteractor.execute(request)
  }

  // start() {
  //   this.view.start()
  // }

  stop() {
    this.view.stop()
  }
}
