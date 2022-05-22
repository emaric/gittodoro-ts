import Duration from '@/interactor/entities/Duration'

import RecordError from '@/interactor/record-timer-system/error/RecordError'

import RecordCommandInterface from '@/interactor/record-timer-system/io/RecordCommandInterface'
import RecordPresenterInterface from '@/interactor/record-timer-system/io/RecordPresenterInterface'
import { mapRequestToDuration } from '@/interactor/record-timer-system/io/mapper'
import { CreateRecordRequest } from '@/interactor/record-timer-system/io/request.model'
import { CreateRecordResponse } from '@/interactor/record-timer-system/io/response.model'
import RecordBuilder from './components/RecordBuilder'

export default class CreateRecordCommand implements RecordCommandInterface {
  private presenter: RecordPresenterInterface

  constructor(presenter: RecordPresenterInterface) {
    this.presenter = presenter
  }

  execute(request: CreateRecordRequest): Promise<CreateRecordResponse> {
    try {
      const duration = mapRequestToDuration(request.duration)
      const record = this.createCurrentRecord(
        duration,
        request.start,
        request.current
      )
      const response = {
        record,
      }
      this.presenter.present(response)
      return Promise.resolve(response)
    } catch (error) {
      return Promise.reject([
        error,
        new RecordError('Error creating current record.'),
      ])
    }
  }

  createCurrentRecord(duration: Duration, start: Date, current: Date) {
    const builder = new RecordBuilder(duration)
    return builder.createRecord(start, current)
  }
}
