import ReadDefaultDurationCommand from '@/interactor/external-users/default-duration/ReadDefaultDurationCommand'
import UpdateDefaultDurationCommand from '@/interactor/external-users/default-duration/UpdateDefaultDurationCommand'
import StartSessionCommand from '@/interactor/external-users/session/StartSessionCommand'
import StopSessionCommand from '@/interactor/external-users/session/StopSessionCommand'
import CreateRecordCommand from '@/interactor/record-system/CreateRecordCommand'
import { SessionTimerGateway } from '../model/db/SessionTimerGateway'
import AppError from '../components/error/AppError'
import Duration from '../model/Duration'
import Record from '../model/Record'
import Session from '../model/Session'
import CreateRecordPresenter from '../model/presenter/CreateRecordPresenter'
import DefaultDurationViewInterface from '../model/presenter/DefaultDurationViewInterface'
import DurationPresenter from '../model/presenter/DurationPresenter'
import RecordViewInterface from '../model/presenter/RecordViewInterface'
import SessionViewInterface from '../model/presenter/SessionViewInterface'
import StartSessionPresenter from '../model/presenter/StartSessionPresenter'
import StopSessionPresenter from '../model/presenter/StopSessionPresenter'
import SessionTimerView from '../view/SessionTimerView'
import SessionTimerModel from '../model/SessionTimerModel'
import CreateNthRecordCommand from '@/interactor/record-system/CreateNthRecordCommand'
import { RequestWith } from '@/interactor/external-users/session/io/request.model'

class SessionTimerObserver
  implements
    DefaultDurationViewInterface,
    SessionViewInterface,
    RecordViewInterface
{
  duration?: Duration
  session?: Session
  record?: Record
  model: SessionTimerModel

  constructor(model: SessionTimerModel) {
    this.model = model
  }

  render(value: Duration | Session | Record) {
    if (value instanceof Duration) {
      this.duration = value
      this.model.defaultDuration = value
    }
    if (value instanceof Session) {
      this.session = value
      this.model.session = value
    }
    if (value instanceof Record) {
      this.record = value
      this.model.records.push(value)
    }
  }
}

export default class SessionTimerController {
  private readDurationInteractor: ReadDefaultDurationCommand
  private updateDurationInteractor: UpdateDefaultDurationCommand
  private startSessionInteractor: StartSessionCommand
  private stopSessionInteractor: StopSessionCommand
  private createRecordInteractor: CreateRecordCommand
  private createNthRecordInteractor: CreateNthRecordCommand
  private observer: SessionTimerObserver

  private view: SessionTimerView
  private model: SessionTimerModel

  constructor(view: SessionTimerView, model: SessionTimerModel) {
    this.view = view
    this.model = model
    this.observer = new SessionTimerObserver(this.model)

    this.view.setOnRecordTimerEnded(async () => {
      if (this.model.session && this.model.session.end == undefined) {
        const { duration, start } = this.model.session
        const n = this.model.records.length + 1
        this.observer.record = undefined
        await this.createNthRecordInteractor.execute({ duration, n, start })
        if (this.observer.record) {
          await this.view.setRecord(this.observer.record)
        } else {
          throw new AppError('Error trying to get the next Record.')
        }
      }
    })

    this.view.setOnStart(async () => {
      await this.start()
    })

    this.view.setOnStop(async () => {
      const session = await this.stopSession()
      this.view.printStoppedSession(session)
      this.model.session = session
    })

    this.view.setOnUpdateDuration(
      async (
        pomodoro: number,
        short: number,
        long: number,
        interval: number
      ) => {
        await this.setDefaultDuration(pomodoro, short, long, interval)
      }
    )

    const db = new SessionTimerGateway()
    const durationPresenter = new DurationPresenter(this.observer)
    const startSessionPresenter = new StartSessionPresenter(this.observer)
    const stopSessionPresenter = new StopSessionPresenter(this.observer)
    const recordPresenter = new CreateRecordPresenter(this.observer)

    this.readDurationInteractor = new ReadDefaultDurationCommand(
      db,
      durationPresenter
    )
    this.updateDurationInteractor = new UpdateDefaultDurationCommand(
      db,
      durationPresenter
    )
    this.startSessionInteractor = new StartSessionCommand(
      db,
      startSessionPresenter
    )
    this.stopSessionInteractor = new StopSessionCommand(
      db,
      stopSessionPresenter
    )

    this.createRecordInteractor = new CreateRecordCommand(recordPresenter)
    this.createNthRecordInteractor = new CreateNthRecordCommand(recordPresenter)
  }

  async start() {
    const duration = await this.getDefaultDuration()
    const session = await this.startSession(duration.id)
    this.view.printStartingSession(session)
    const firstRecord = await this.createRecord(duration, session.start)
    await this.view.setRecord(firstRecord)
  }

  async getDefaultDuration(): Promise<Duration> {
    const methodError = new AppError('Failed to get the default duration.')
    try {
      await this.readDurationInteractor.execute()
      return this.observer.duration || Promise.reject(methodError)
    } catch (error) {
      methodError.errors.push(error as Error)
      return Promise.reject(methodError)
    }
  }

  async setDefaultDuration(
    pomodoro: number,
    short: number,
    long: number,
    interval: number
  ): Promise<Duration> {
    const methodError = new AppError('Failed to update the default duration.')
    try {
      this.observer.duration = undefined
      await this.updateDurationInteractor.execute({
        pomodoro,
        short,
        long,
        interval,
      })
      return this.observer.duration || Promise.reject(methodError)
    } catch (error) {
      methodError.errors.push(error as Error)
      return Promise.reject(methodError)
    }
  }

  async startSession(durationId: string): Promise<Session> {
    const errorMessage = 'Failed to start a Session.'
    try {
      this.observer.session = undefined
      const request = {
        with: RequestWith.durationID,
        start: new Date(),
        duration: {
          id: durationId,
        },
      }
      await this.startSessionInteractor.execute(request)
      if (this.observer.session) {
        return Promise.resolve(this.observer.session)
      }
      return Promise.reject(new AppError(errorMessage))
    } catch (error) {
      return Promise.reject(new AppError(errorMessage, error as Error))
    }
  }

  async stopSession(): Promise<Session> {
    const errorMessage = 'Failed to stop a Session.'
    try {
      this.observer.session = undefined
      await this.stopSessionInteractor.execute({
        date: new Date(),
      })
      if (this.observer.session) {
        return Promise.resolve(this.observer.session)
      }
      return Promise.reject(new AppError(errorMessage))
    } catch (error) {
      return Promise.reject(new AppError(errorMessage, error as Error))
    }
  }

  async createRecord(duration: Duration, start: Date): Promise<Record> {
    const errorMessage = 'Error encountered while trying to create Record.'
    try {
      this.observer.record = undefined
      await this.createRecordInteractor.execute({
        duration,
        start,
        current: new Date(),
      })
      if (this.observer.record) {
        return this.observer.record
      }
      throw new AppError(errorMessage)
    } catch (error) {
      const createRecordError = new AppError(errorMessage)
      createRecordError.errors.push(error as Error)
      throw createRecordError
    }
  }
}
