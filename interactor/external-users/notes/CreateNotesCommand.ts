import NotesError from './error/NotesError'
import { CreateNotesGatewayInterface } from './io/data.gateway'
import NotesCommandInterface from './io/NotesCommandInterface'
import NotesPresenterInterface from './io/NotesPresenterInterface'
import { CreateNotesRequest } from './io/request.model'
import { NoteListResponse } from './io/response.model'

export default class CreateNotesCommand implements NotesCommandInterface {
  dataGateway: CreateNotesGatewayInterface
  presenter: NotesPresenterInterface

  constructor(
    dataGateway: CreateNotesGatewayInterface,
    presenter: NotesPresenterInterface
  ) {
    this.dataGateway = dataGateway
    this.presenter = presenter
  }

  async execute(request: CreateNotesRequest): Promise<NoteListResponse> {
    try {
      const notes = await this.dataGateway.create(request.notes)
      const response = {
        notes,
      }
      await this.presenter.present(response)
      return response
    } catch (error) {
      throw new NotesError('Failed to create notes.', error as Error)
    }
  }
}
