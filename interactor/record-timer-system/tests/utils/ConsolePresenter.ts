import RecordPresenterInterface from '@/interactor/record-timer-system/io/RecordPresenterInterface'
import { RecordBaseResponse } from '@/interactor/record-timer-system/io/response.model'

export default class ConsolePresenter implements RecordPresenterInterface {
  present(response: RecordBaseResponse): Promise<void> {
    console.log(new Date().toJSON() + ' : ' + JSON.stringify(response))
    return Promise.resolve()
  }
}
