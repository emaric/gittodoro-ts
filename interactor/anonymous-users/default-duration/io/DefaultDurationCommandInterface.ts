import { DefaultDurationBaseRequest } from './request.model'

export default interface DefaultDurationCommandInterface {
  execute(request?: DefaultDurationBaseRequest): unknown
}
