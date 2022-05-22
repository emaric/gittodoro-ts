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
    this.interval = durationMillis / (this.duration + 2)
    this.onEnd = onEnd
  }

  private run() {
    console.log(new Date().toJSON() + 'run:', this.state)
    if (this.to != undefined) {
      clearTimeout(this.to)
    }
    this.to = setTimeout(() => {
      if (this.duration < 0) {
        this.to != undefined && clearTimeout(this.to)
        this.onEnd && this.onEnd()
      } else {
        console.log(this.state + ' ' + this.duration--)
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
      this.recordView.stop()
    } else {
      this.recordController.createRecord(session)
      // this.recordView.start()
    }
  }

  displayStart(session: Session) {
    if (session.end) {
      throw new Error('This session has ended.')
    }
    console.log('Starting a session...')
  }

  displayRunningSession(session: Session) {
    // const { state, remainingTime } = session.calcStateRemainingTime()
    // if (remainingTime > 0) {
    //   console.log(state + ' : ' + remainingTime)
    //   this.timeoutTimer && clearTimeout(this.timeoutTimer)
    //   this.timeoutTimer = setTimeout(() => {
    //     if (this.timeoutTimer) {
    //       clearTimeout(this.timeoutTimer)
    //       console.log(state + ' : ' + 0)
    //     }
    //     this.displayRunningSession(session)
    //   }, remainingTime * 1000)
    //   this.intervalTimer && clearInterval(this.intervalTimer)
    //   let countDown = remainingTime
    //   this.intervalTimer = setInterval(() => {
    //     console.log(state + ' : ' + --countDown)
    //   }, 1000)
    // } else {
    //   this.timeoutTimer && clearTimeout(this.timeoutTimer)
    //   this.intervalTimer && clearInterval(this.intervalTimer)
    // }
  }

  displayStoppedSession(session: Session) {
    if (session.end) {
      console.log('Stoping a session...')
      // this.timeoutTimer && clearTimeout(this.timeoutTimer)
      // this.intervalTimer && clearInterval(this.intervalTimer)
      console.log('Session has ended.')
    } else {
      throw new Error('The session should have an end date.')
    }
  }
}
