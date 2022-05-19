import Record from '@/examples/anonymous-user-app/model/Record'
import Logger from '@/examples/anonymous-user-app/model/Logger'

export default class RecordTimer {
  private timeout?: NodeJS.Timeout
  private logger?: Logger
  private record?: Record
  private onStopped?: (record?: Record) => void

  constructor(logger?: Logger) {
    this.logger = logger
  }

  setOnStoppedListener(cb: (record?: Record) => void) {
    this.onStopped = cb
  }

  start(record: Record) {
    this.record = record
    this.logger?.debug(
      'Starting RecordTimer...',
      this.record?.state,
      this.record?.duration,
      'seconds'
    )
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
    const ms = record.remainingMillis
    this.timeout = setTimeout(() => {
      this.stop()
    }, ms)
  }

  stop(end = new Date()) {
    this.logger?.debug(
      'Stopping RecordTimer...',
      this.record?.state,
      this.record?.duration,
      'seconds'
    )
    if (this.timeout) {
      clearTimeout(this.timeout)
      this.timeout = undefined
    }
    if (this.record) {
      const record = new Record(this.record.state, this.record.start, end)
      this.onStopped?.(record)
    } else {
      this.onStopped?.()
    }
  }
}
