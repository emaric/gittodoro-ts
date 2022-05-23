import Duration from '@/interactor/entities/Duration'

import RecordError from '@/interactor/record-timer-system/error/RecordError'

import RecordCommandInterface from '@/interactor/record-timer-system/io/RecordCommandInterface'
import RecordPresenterInterface from '@/interactor/record-timer-system/io/RecordPresenterInterface'
import { mapRequestToDuration } from '@/interactor/record-timer-system/io/mapper'
import { CreateNthRecordRequest } from '@/interactor/record-timer-system/io/request.model'
import { CreateRecordResponse } from '@/interactor/record-timer-system/io/response.model'
import RecordBuilder from './components/RecordBuilder'

export default class CreateNthRecordCommand implements RecordCommandInterface {
  private presenter: RecordPresenterInterface

  constructor(presenter: RecordPresenterInterface) {
    this.presenter = presenter
  }

  execute(request: CreateNthRecordRequest): Promise<CreateRecordResponse> {
    try {
      const duration = mapRequestToDuration(request.duration)
      const record = this.createNthRecord(duration, request.n, request.start)
      const response = {
        record,
      }
      this.presenter.present(response)
      return Promise.resolve(response)
    } catch (error) {
      return Promise.reject(
        new RecordError('Error creating current record.', [error as Error])
      )
    }
  }

  createNthRecord(duration: Duration, n: number, start: Date) {
    const builder = new RecordBuilder(duration)
    return builder.createNthRecord(n, start)
  }
}
