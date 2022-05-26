import Note from '@/interactor/entities/Note'

import { RequestBy } from '@/interactor/external-users/common/io/request.model'
import RequestByIDsValidator from '@/interactor/external-users/validators/RequestByIDsValidator'
import RequestByRangeValidator from '@/interactor/external-users/validators/RequestByRangeValidator'

import NotesError from './error/NotesError'

import { ReadNotesGatewayInterface } from './io/data.gateway'
import { mapNoteListToResponse } from './io/mapper'
import NotesCommandInterface from './io/NotesCommandInterface'
import NotesPresenterInterface from './io/NotesPresenterInterface'
import { ReadByIDs, ReadByRange, ReadNotesRequest } from './io/request.model'
import { NoteListResponse } from './io/response.model'

export default class ReadNotesCommand implements NotesCommandInterface {
  private dataGateway: ReadNotesGatewayInterface
  private presenter: NotesPresenterInterface

  constructor(
    dataGateway: ReadNotesGatewayInterface,
    presenter: NotesPresenterInterface
  ) {
    this.dataGateway = dataGateway
    this.presenter = presenter
  }

  async execute(request: ReadNotesRequest): Promise<NoteListResponse> {
    try {
      if (request.by == RequestBy.range) {
        return await this.executeByRange(request as ReadByRange)
      }

      if (request.by == RequestBy.ids) {
        return await this.executeByIDs(request as ReadByIDs)
      }

      return Promise.reject(new NotesError('Invalid request type.'))
    } catch (error) {
      return Promise.reject(
        new NotesError('Failed to read notes.', error as Error)
      )
    }
  }

  private async executeByRange(
    request: ReadByRange
  ): Promise<NoteListResponse> {
    try {
      await this.validateByRangeRequest(request)
      const notes = await this.dataGateway.readByRange(
        request.startInclusive,
        request.end
      )
      return await this.respond(notes)
    } catch (error) {
      return Promise.reject(
        new NotesError('Failed to read notes by range.', error as Error)
      )
    }
  }

  private async executeByIDs(request: ReadByIDs): Promise<NoteListResponse> {
    try {
      await this.validateByIDsRequest(request)
      const notes = await this.dataGateway.readByIDs(request.ids)
      return await this.respond(notes)
    } catch (error) {
      return Promise.reject(
        new NotesError('Failed to read notes by ids.', error as Error)
      )
    }
  }

  private async respond(notes: Note[]): Promise<NoteListResponse> {
    try {
      const response: NoteListResponse = {
        notes: mapNoteListToResponse(notes),
      }
      await this.presenter.present(response)
      return Promise.resolve(response)
    } catch (error) {
      return Promise.reject(
        new NotesError('Failed sending out response.', error as Error)
      )
    }
  }

  private async validateByRangeRequest(request: ReadByRange) {
    return await RequestByRangeValidator.getInstance().validate(request)
  }

  private async validateByIDsRequest(request: ReadByIDs) {
    return await RequestByIDsValidator.getInstance().validate(request)
  }
}
