import RecordError from '@/interactor/record-system/error/RecordError'
import RecordPresenterInterface from '@/interactor/record-system/io/RecordPresenterInterface'
import { CreateRecordResponse } from '@/interactor/record-system/io/response.model'
import { mapResponseToRecord } from './mapper'
import RecordViewInterface from './RecordViewInterface'

export default class CreateRecordPresenter implements RecordPresenterInterface {
  private view: RecordViewInterface

  constructor(view: RecordViewInterface) {
    this.view = view
  }

  present(response: CreateRecordResponse) {
    if (response.record) {
      const record = mapResponseToRecord(response.record)
      this.view.render(record)
      return Promise.resolve(record)
    } else {
      return Promise.reject(
        new RecordError(
          `Failed to get a record from the given response: ${JSON.stringify(
            response
          )} while trying to create a Record.`
        )
      )
    }
  }
}
