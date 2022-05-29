import SessionPresenterInterface from '../session/io/SessionPresenterInterface'
import NotesError from './error/NotesError'
import { ReadFirstNoteGatewayInterface } from './io/data.gateway'
import NotesCommandInterface from './io/NotesCommandInterface'
import { ReadFirstNoteResponse } from './io/response.model'

export default class ReadFirstNoteCommand implements NotesCommandInterface {
  private dataGateway: ReadFirstNoteGatewayInterface
  private presenter: SessionPresenterInterface

  constructor(
    dataGateway: ReadFirstNoteGatewayInterface,
    presenter: SessionPresenterInterface
  ) {
    this.dataGateway = dataGateway
    this.presenter = presenter
  }

  async execute(): Promise<ReadFirstNoteResponse> {
    try {
      const note = await this.dataGateway.first()
      const response = {
        note,
      }
      await this.presenter.present(response)
      return response
    } catch (error) {
      throw new NotesError('Failed to read the first note.', error as Error)
    }
  }
}
