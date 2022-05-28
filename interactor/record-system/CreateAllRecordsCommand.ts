import Duration from '@/interactor/entities/Duration'

import RecordError from '@/interactor/record-system/error/RecordError'

import RecordCommandInterface from '@/interactor/record-system/io/RecordCommandInterface'
import RecordPresenterInterface from '@/interactor/record-system/io/RecordPresenterInterface'
import { mapRequestToDuration } from '@/interactor/record-system/io/mapper'
import { CreateAllRecordsRequest } from '@/interactor/record-system/io/request.model'
import { CreateAllRecordsResponse } from '@/interactor/record-system/io/response.model'
import RecordBuilder from './components/RecordFactory'
import RequestWithDurationValidator from '../validators/RequestWithDurationValidator'

export default class CreateAllRecordsCommand implements RecordCommandInterface {
  private presenter: RecordPresenterInterface

  constructor(presenter: RecordPresenterInterface) {
    this.presenter = presenter
  }

  async execute(
    request: CreateAllRecordsRequest
  ): Promise<CreateAllRecordsResponse> {
    try {
      await RequestWithDurationValidator.getInstance().validate(request)
      const duration = mapRequestToDuration(request.duration)
      const records = this.createAllRecords(
        duration,
        request.start,
        request.end
      )
      const response = {
        records,
      }
      try {
        await this.presenter.present(response)
      } catch (error) {
        return Promise.reject(
          new RecordError('Failed presenting record.', error as Error)
        )
      }
      return Promise.resolve(response)
    } catch (error) {
      return Promise.reject(
        new RecordError('Error creating all record.', error as Error)
      )
    }
  }

  private createAllRecords(duration: Duration, start: Date, end: Date) {
    const builder = new RecordBuilder(duration)
    return builder.createAllRecords(start, end)
  }
}
