import { DefaultDurationBaseRequest } from './request.model'
import { DefaultDurationBaseResponse } from './response.model'

export default interface DefaultDurationCommandInterface {
  execute(
    request?: DefaultDurationBaseRequest
  ): Promise<DefaultDurationBaseResponse>
}
