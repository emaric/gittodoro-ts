import { DefaultDurationBaseResponse } from './response.model'

export default interface DefaultDurationPresenterInterface {
  present(response: DefaultDurationBaseResponse): Promise<unknown>
}
