import { logger } from '../components/loggers'
import Record from '../model/Record'
import RecordViewInterface from '../presenter/RecordViewInterface'

export default class RecordView implements RecordViewInterface {
  private _record?: Record
  callback?: CallableFunction

  constructor(callback?: CallableFunction) {
    this.callback = callback
  }

  render(record: Record) {
    logger.log('Rendering Record...')
    logger.log('Record:', record, '\n\n')

    this._record = record
    this.callback?.(record)
  }

  get record() {
    return this._record
  }
}
