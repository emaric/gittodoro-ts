import NotesError from './error/NotesError'
import { UpdateNotesGatewayInterface } from './io/data.gateways'
import NotesCommandInterface from './io/NotesCommandInterface'
import NotesPresenterInterface from './io/NotesPresenterInterface'
import { UpdateNotesRequest } from './io/request.model'
import { NoteListResponse } from './io/response.model'

export default class UpdateNotesCommand implements NotesCommandInterface {
  dataGateway: UpdateNotesGatewayInterface
  presenter: NotesPresenterInterface

  constructor(
    dataGateway: UpdateNotesGatewayInterface,
    presenter: NotesPresenterInterface
  ) {
    this.dataGateway = dataGateway
    this.presenter = presenter
  }

  async execute(request: UpdateNotesRequest): Promise<NoteListResponse> {
    try {
      const notes = await this.dataGateway.update(request.notes)
      const response = {
        notes,
      }
      await this.presenter.present(response)
      return Promise.resolve(response)
    } catch (error) {
      return Promise.reject(
        new NotesError('Failed to update notes.', error as Error)
      )
    }
  }
}
