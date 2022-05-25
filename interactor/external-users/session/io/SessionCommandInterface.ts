import { SessionBaseRequest } from './request.model'
import { SessionBaseResponse } from './response.model'

export default interface SessionCommandInterface {
  execute(request?: SessionBaseRequest): Promise<SessionBaseResponse>
}
