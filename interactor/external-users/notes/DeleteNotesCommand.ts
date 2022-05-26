import Note from '@/interactor/entities/Note'

import NotesError from './error/NotesError'

import { RequestBy } from '@/interactor/external-users/common/io/request.model'
import RequestByRangeValidator from '@/interactor/external-users/validators/RequestByRangeValidator'

import { DeleteNotesGatewayInterface } from './io/data.gateway'
import { mapNoteListToResponse } from './io/mapper'
import {
  DeleteByIDs,
  DeleteByRange,
  DeleteNotesRequest,
} from './io/request.model'
import { NoteListResponse } from './io/response.model'
import NotesCommandInterface from './io/NotesCommandInterface'
import NotesPresenterInterface from './io/NotesPresenterInterface'
import RequestByIDsValidator from '../validators/RequestByIDsValidator'

export default class DeleteNotesCommand implements NotesCommandInterface {
  private dataGateway: DeleteNotesGatewayInterface
  private presenter: NotesPresenterInterface

  constructor(
    dataGateway: DeleteNotesGatewayInterface,
    presenter: NotesPresenterInterface
  ) {
    this.dataGateway = dataGateway
    this.presenter = presenter
  }

  async execute(request: DeleteNotesRequest): Promise<NoteListResponse> {
    try {
      if (request.by == RequestBy.range) {
        return await this.executeByRange(request as DeleteByRange)
      }

      if (request.by == RequestBy.ids) {
        return await this.executeByIDs(request as DeleteByIDs)
      }

      return Promise.reject(new NotesError('Invalid request type.'))
    } catch (error) {
      return Promise.reject(
        new NotesError('Failed to delete notes.', error as Error)
      )
    }
  }

  private async executeByRange(
    request: DeleteByRange
  ): Promise<NoteListResponse> {
    try {
      await this.validateByRangeRequest(request)
      const notes = await this.dataGateway.deleteByRange(
        request.startInclusive,
        request.end
      )
      return await this.respond(notes)
    } catch (error) {
      return Promise.reject(
        new NotesError('Failed to delete notes by range.', error as Error)
      )
    }
  }

  private async executeByIDs(request: DeleteByIDs): Promise<NoteListResponse> {
    try {
      await this.validateByIDsRequest(request)
      const notes = await this.dataGateway.deleteByIDs(request.ids)
      return await this.respond(notes)
    } catch (error) {
      return Promise.reject(
        new NotesError('Failed to delete notes by ids.', error as Error)
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

  private async validateByRangeRequest(request: DeleteByRange) {
    return await RequestByRangeValidator.getInstance().validate(request)
  }

  private async validateByIDsRequest(request: DeleteByIDs) {
    return await RequestByIDsValidator.getInstance().validate(request)
  }
}
