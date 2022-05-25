import { RecordBaseResponse } from '@/interactor/record-timer-system/io/response.model'

export default interface RecordPresenterInterface {
  present(response: RecordBaseResponse): Promise<unknown>
}
