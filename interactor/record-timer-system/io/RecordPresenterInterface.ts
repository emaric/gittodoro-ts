import { RecordBaseResponse } from './response.model'

export default interface RecordPresenterInterface {
  present(response: RecordBaseResponse): unknown
}
