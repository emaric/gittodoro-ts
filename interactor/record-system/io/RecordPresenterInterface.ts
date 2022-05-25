import { RecordBaseResponse } from '@/interactor/record-system/io/response.model'

export default interface RecordPresenterInterface {
  present(response: RecordBaseResponse): Promise<unknown>
}
