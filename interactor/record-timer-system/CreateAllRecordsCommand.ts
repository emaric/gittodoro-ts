import Duration from '@/interactor/entities/Duration'

import RecordError from '@/interactor/record-timer-system/error/RecordError'

import RecordCommandInterface from '@/interactor/record-timer-system/io/RecordCommandInterface'
import RecordPresenterInterface from '@/interactor/record-timer-system/io/RecordPresenterInterface'
import { mapRequestToDuration } from '@/interactor/record-timer-system/io/mapper'
import { CreateAllRecordsRequest } from '@/interactor/record-timer-system/io/request.model'
import { CreateAllRecordsResponse } from '@/interactor/record-timer-system/io/response.model'
import RecordBuilder from './components/RecordBuilder'

export default class CreateAllRecordsCommand implements RecordCommandInterface {
  private presenter: RecordPresenterInterface

  constructor(presenter: RecordPresenterInterface) {
    this.presenter = presenter
  }

  async execute(
    request: CreateAllRecordsRequest
  ): Promise<CreateAllRecordsResponse> {
    try {
      const duration = mapRequestToDuration(request.duration)
      const records = this.createAllRecords(
        duration,
        request.start,
        request.end
      )
      const response = {
        records,
      }
      await this.presenter.present(response)
      return Promise.resolve(response)
    } catch (error) {
      return Promise.reject(
        new RecordError('Error creating current record.', error as Error)
      )
    }
  }

  createAllRecords(duration: Duration, start: Date, end: Date) {
    const builder = new RecordBuilder(duration)
    return builder.createAllRecords(start, end)
  }
}
