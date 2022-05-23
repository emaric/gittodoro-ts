import Session from '@/examples/anonymous-user-app/model/Session'
import Record from '@/examples/anonymous-user-app/model/Record'
import Logger from '@/examples/anonymous-user-app/model/Logger'

import * as RecordAPI from '@/examples/anonymous-user-app/api/record'

import RecordTimer from './RecordTimer'

export default class SessionTimer {
  private activeSessionTimeout?: NodeJS.Timeout
  private session?: Session
  private logger?: Logger
  private recordTimer: RecordTimer
  readonly finishedRecords: Record[]

  constructor(logger?: Logger) {
    this.logger = logger
    this.recordTimer = new RecordTimer(logger)
    this.finishedRecords = []
    this.recordTimer.setOnStoppedListener((record?: Record) => {
      this.onRecordTimerEnded(record)
    })

    RecordAPI.onRecordChanged((record: Record) => {
      console.log(
        new Date().toJSON() +
          ' : --------------------------------------------------',
        record
      )
      this.recordTimer.start(record)
    })
  }

  private startActiveSessionTimer() {
    if (this.activeSessionTimeout) {
      clearTimeout(this.activeSessionTimeout)
    }
    if (this.session && this.session?.end == undefined) {
      const ms = this.session.remainingActiveMillis
      this.activeSessionTimeout = setTimeout(() => {
        this.stop()
      }, ms)
    }
  }

  private onRecordTimerEnded(record?: Record): void {
    if (record && this.session) {
      this.logger?.debug(
        'Finished a record timer:',
        record.state,
        record.duration,
        'seconds\n\n'
      )
      this.finishedRecords.push(record)
    }
    if (this.activeSessionTimeout && this.session && record) {
      RecordAPI.createNth(
        this.session.duration,
        this.finishedRecords.length + 1,
        this.session.start
      )
      // const nextRecord = createNextRecord(
      //   this.finishedRecords.length,
      //   this.session.duration,
      //   record.end
      // )
      // this.recordTimer.start(nextRecord)
    }
  }

  private startRecordTimer() {
    if (this.activeSessionTimeout && this.session) {
      RecordAPI.create(this.session.duration, this.session.start, new Date())
      // this.recordTimer.start(
      //   createNextRecord(0, this.session.duration, this.session.start)
      // )
    }
  }

  start(session: Session) {
    this.session = session
    this.logger?.debug(
      'Starting SessionTimer... \nsession:',
      this.session,
      '\n'
    )
    this.startActiveSessionTimer()
    this.startRecordTimer()
  }

  stop(end = new Date()) {
    this.logger?.debug(
      'Stopping SessionTimer... \nsession:',
      this.session,
      '\n'
    )
    if (this.activeSessionTimeout) {
      clearTimeout(this.activeSessionTimeout)
      this.activeSessionTimeout = undefined
      this.recordTimer.stop(end)
    }
  }
}
