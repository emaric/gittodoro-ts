import Duration from '@/interactor/entities/Duration'

import RecordError from '@/interactor/record-system/error/RecordError'

import RecordCommandInterface from '@/interactor/record-system/io/RecordCommandInterface'
import RecordPresenterInterface from '@/interactor/record-system/io/RecordPresenterInterface'
import { mapRequestToDuration } from '@/interactor/record-system/io/mapper'
import { CreateRecordRequest } from '@/interactor/record-system/io/request.model'
import { CreateRecordResponse } from '@/interactor/record-system/io/response.model'
import RecordBuilder from './components/RecordFactory'
import RequestWithDurationValidator from '../validators/RequestWithDurationValidator'

export default class CreateRecordCommand implements RecordCommandInterface {
  private presenter: RecordPresenterInterface

  constructor(presenter: RecordPresenterInterface) {
    this.presenter = presenter
  }

  async execute(request: CreateRecordRequest): Promise<CreateRecordResponse> {
    try {
      await RequestWithDurationValidator.getInstance().validate(request)
      const duration = mapRequestToDuration(request.duration)
      const record = this.createRecord(duration, request.start, request.current)
      const response = {
        record,
      }
      await this.presenter.present(response)
      return response
    } catch (error) {
      throw new RecordError('Error creating current record.', error as Error)
    }
  }

  private createRecord(duration: Duration, start: Date, current: Date) {
    const builder = new RecordBuilder(duration)
    return builder.createRecord(start, current)
  }
}
