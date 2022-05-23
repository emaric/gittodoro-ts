import { Session } from '@/examples/cli-app/models/Session'
import { RecordController } from './controller'
import Record from './models/Record'
import { CLIView, RecordCLIViewInterface } from './presenter'

export class RecordTimer {
  private to?: NodeJS.Timeout
  private interval: number
  private duration: number
  private state: string

  private onEnd?: CallableFunction

  constructor(state: string, start: Date, end: Date, onEnd?: CallableFunction) {
    this.state = state
    const durationMillis = end.getTime() - start.getTime()
    this.duration = durationMillis / 1000
    this.interval = durationMillis / this.duration
    this.onEnd = onEnd
  }

  private run() {
    if (this.to != undefined) {
      clearTimeout(this.to)
    }
    this.to = setTimeout(() => {
      console.log(this.state + ' : ' + --this.duration)
      if (this.duration <= 0) {
        this.to != undefined && clearTimeout(this.to)
        this.onEnd && this.onEnd()
      } else {
        this.run()
      }
    }, this.interval)
  }

  start() {
    console.log(this.state + ' : ' + this.duration)
    this.run()
  }

  stop() {
    if (this.to != undefined) {
      clearTimeout(this.to)
    }
  }
}

export class RecordCLIView implements RecordCLIViewInterface {
  private timer?: RecordTimer
  private onEnd?: CallableFunction

  constructor(onEnd?: CallableFunction) {
    this.onEnd = onEnd
  }

  display(record: Record) {
    if (this.timer != undefined) {
      this.timer.stop()
    }
    this.timer = new RecordTimer(
      record.state,
      record.start,
      record.end,
      this.onEnd
    )
    this.timer.start()
  }

  stop() {
    this.timer?.stop()
  }
}

export class CLI implements CLIView {
  private session?: Session
  private recordController: RecordController
  private recordView: RecordCLIView

  constructor() {
    this.recordView = new RecordCLIView(() => {
      this.session && this.recordController.createRecord(this.session)
      // this.recordView.start()
    })
    this.recordController = new RecordController(this.recordView)
  }

  display(session: Session): void {
    this.session = session
    if (session.end) {
      this.displayStoppedSession(session)
    } else {
      this.displayStart()
      this.session && this.displayRunningSession(session)
      // this.recordView.start()
    }
  }

  displayStart() {
    if (this.session?.end) {
      throw new Error('This session has ended.')
    }
    console.log('Starting a session...')
  }

  displayRunningSession(session: Session) {
    this.recordController.createRecord(session)
  }

  displayStoppedSession(session: Session) {
    if (session?.end) {
      console.log('Stopping a session...')
      this.recordView.stop()
      // this.timeoutTimer && clearTimeout(this.timeoutTimer)
      // this.intervalTimer && clearInterval(this.intervalTimer)
      console.log('Session has ended.')
    } else {
      throw new Error('The session should have an end date.')
    }
  }
}
