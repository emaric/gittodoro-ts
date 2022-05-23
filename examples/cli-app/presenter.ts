import { mapSession } from './response-view-mapper'
import { Session } from './models/Session'
import SessionPresenterInterface from '@/interactor/anonymous-users/session/io/SessionPresenterInterface'
import {
  StartSessionResponse,
  StopSessionResponse,
} from '@/interactor/anonymous-users/session/io/response.model'
import RecordPresenterInterface from '@/interactor/record-timer-system/io/RecordPresenterInterface'
import { CreateRecordResponse } from '@/interactor/record-timer-system/io/response.model'
import Record from './models/Record'

export interface CLIView {
  display(content: Session): void
}

export class SessionCLIPresenter implements SessionPresenterInterface {
  cliView: CLIView

  constructor(cliView: CLIView) {
    this.cliView = cliView
  }
  present(
    response: StartSessionResponse | StopSessionResponse
  ): Promise<Session> {
    return new Promise((resolve) => {
      if (response.session) {
        const session = mapSession(response.session)
        this.cliView.display(session)
        resolve(session)
      }
    })
  }
}

export interface RecordCLIViewInterface {
  display(record: Record): unknown
}

export class RecordCLIPresenter implements RecordPresenterInterface {
  private view: RecordCLIViewInterface

  constructor(view: RecordCLIViewInterface) {
    this.view = view
  }

  present(response: CreateRecordResponse) {
    const { record } = response
    this.view.display(new Record(record.state, record.start, record.end))
  }
}
