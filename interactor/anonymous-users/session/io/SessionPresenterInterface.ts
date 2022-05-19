import { SessionBaseResponse } from './response.model'

export default interface SessionPresenterInterface {
  present(response: SessionBaseResponse): unknown
}
