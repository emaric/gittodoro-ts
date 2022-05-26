import { NotesBaseRequest } from './request.model'
import { NotesBaseResponse } from './response.model'

export default interface NotesCommandInterface {
  execute(request: NotesBaseRequest): Promise<NotesBaseResponse>
}
