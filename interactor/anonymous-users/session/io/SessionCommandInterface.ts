import { SessionBaseRequest } from './request.model'

export default interface SessionCommandInterface {
  execute(request?: SessionBaseRequest): unknown
}
