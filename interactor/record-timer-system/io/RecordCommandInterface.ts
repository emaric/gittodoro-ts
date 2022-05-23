import { RecordBaseRequest } from './request.model'
import { RecordBaseResponse } from './response.model'

export default interface RecordCommandInterface {
  execute(request: RecordBaseRequest): Promise<RecordBaseResponse>
}
