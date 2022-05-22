import RecordPresenterInterface from '../../io/RecordPresenterInterface'
import { RecordBaseResponse } from '../../io/response.model'

export default class ConsolePresenter implements RecordPresenterInterface {
  present(response: RecordBaseResponse) {
    console.log(response)
  }
}
