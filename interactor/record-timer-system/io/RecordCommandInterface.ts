import { RecordBaseRequest } from './request.model'

export default interface RecordCommandInterface {
  execute(request: RecordBaseRequest): unknown
}
