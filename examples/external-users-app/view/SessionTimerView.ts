import Duration from '@/examples/external-users-app/model/Duration'
import Record from '@/examples/external-users-app/model/Record'
import Session from '@/examples/external-users-app/model/Session'
import AppError from '../components/error/AppError'

export default class SessionTimerView {
  private recordTimeout?: NodeJS.Timeout
  private onStart?: CallableFunction
  private onStop?: CallableFunction
  private onRecordTimerEnded?: (record: Record) => Promise<void>
  private onCycleEnded?: (record: Record) => Promise<void>
  private onUpdateDuration?: (
    pomodoro: number,
    short: number,
    long: number,
    interval: number
  ) => Promise<void>

  setOnStart(fn: CallableFunction) {
    this.onStart = fn
  }

  setOnStop(fn: CallableFunction) {
    this.onStop = fn
  }

  setOnUpdateDuration(
    fn: (
      pomodoro: number,
      short: number,
      long: number,
      interval: number
    ) => Promise<void>
  ) {
    this.onUpdateDuration = fn
  }

  setOnRecordTimerEnded(fn: (record: Record) => Promise<void>) {
    this.onRecordTimerEnded = fn
  }

  setOnCycleEnded(fn: (record: Record) => Promise<void>) {
    this.onCycleEnded = fn
  }

  async setRecord(record: Record) {
    if (this.recordTimeout != undefined) {
      clearTimeout(this.recordTimeout)
    }

    const callListeners = async (record: Record) => {
      if (record.state == 'long') {
        await this.onCycleEnded?.(record)
      }
      await this.onRecordTimerEnded?.(record)
    }

    const ms = record.end.getTime() - Date.now()
    if (ms > 0) {
      this.printRecord(record)
      this.recordTimeout = setTimeout(async () => {
        this.recordTimeout && clearTimeout(this.recordTimeout)
        await callListeners(record)
      }, ms)
    } else {
      await callListeners(record)
    }
  }

  async start() {
    if (this.onStart == undefined) {
      console.log('SessionTimerView.start method was called.')
    }

    try {
      await this.onStart?.()
    } catch (error) {
      throw new AppError('Error trying to execute Start.', error as Error)
    }
  }

  async stop() {
    if (this.recordTimeout) {
      clearTimeout(this.recordTimeout)
    }

    if (this.onStop == undefined) {
      console.log('SessionTimerView.stop method was called.')
    }

    try {
      console.log('\n')
      await this.onStop?.()
    } catch (error) {
      throw new AppError('Error trying to execute Stop.', error as Error)
    }
  }

  async updateDuration(
    pomodoro: number,
    short: number,
    long: number,
    interval: number
  ) {
    if (this.onUpdateDuration == undefined) {
      console.log('SessionTimerView.updateDuration method was called.')
    }

    try {
      await this.onUpdateDuration?.(pomodoro, short, long, interval)
    } catch (error) {
      throw new AppError('Error trying to update Duration.', error as Error)
    }
  }

  printTimerDetails(duration: Duration) {
    console.log(
      `\nThe timer is set to run for ${
        duration.pomodoro / (1000 * 60)
      } minutes for each Pomodoro or 'Focus time!'. Then a short break of ${
        duration.short / (1000 * 60)
      } minutes. After ${
        duration.interval
      } Pomodoros, the next break will be for ${
        duration.long / (1000 * 60)
      } minutes.\n`
    )

    return this.wait(3 * 1000)
  }

  printStartingSession(session: Session) {
    if (session.end == undefined) console.log('\nStarting a Session...')
  }

  printRecord(record: Record) {
    const minutes =
      (record.end.getTime() - record.start.getTime()) / (1000 * 60)

    if (record.state == 'pomodoro') {
      console.log(`\n🍅 Stay focused on the task for ${minutes} minutes.`)
    } else if (record.state == 'short') {
      console.log(`\n🟢 Take a break for ${minutes} minutes.`)
    } else {
      console.log(`\n🔵 Take a break for ${minutes} minutes.`)
    }
  }

  printStoppedSession(session: Session) {
    if (session.end) console.log('The Session has stopped.\n')
  }

  wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}
