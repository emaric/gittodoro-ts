import { NotesBaseResponse } from './response.model'

export default interface NotesPresenterInterface {
  present(response: NotesBaseResponse): Promise<unknown>
}
