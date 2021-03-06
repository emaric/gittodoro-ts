import Session from '@/interactor/entities/Session'

import SessionError from './error/SessionError'

import { RequestBy } from '@/interactor/external-users/common/io/request.model'
import RequestByRangeValidator from '@/interactor/external-users/validators/RequestByRangeValidator'

import { DeleteSessionsGatewayInterface } from './io/data.gateway'
import { mapSessionListToResponse } from './io/mapper'
import {
  DeleteByIDs,
  DeleteByRange,
  DeleteSessionsRequest,
} from './io/request.model'
import { SessionListResponse } from './io/response.model'
import SessionCommandInterface from './io/SessionCommandInterface'
import SessionPresenterInterface from './io/SessionPresenterInterface'
import RequestByIDsValidator from '../validators/RequestByIDsValidator'

export default class DeleteSessionsCommand implements SessionCommandInterface {
  private dataGateway: DeleteSessionsGatewayInterface
  private presenter: SessionPresenterInterface

  constructor(
    dataGateway: DeleteSessionsGatewayInterface,
    presenter: SessionPresenterInterface
  ) {
    this.dataGateway = dataGateway
    this.presenter = presenter
  }

  async execute(request: DeleteSessionsRequest): Promise<SessionListResponse> {
    try {
      if (request.by == RequestBy.range) {
        return await this.executeByRange(request as DeleteByRange)
      }

      if (request.by == RequestBy.ids) {
        return await this.executeByIDs(request as DeleteByIDs)
      }

      throw new SessionError('Invalid request type.')
    } catch (error) {
      throw new SessionError('Failed to delete sessions.', error as Error)
    }
  }

  private async executeByRange(
    request: DeleteByRange
  ): Promise<SessionListResponse> {
    try {
      await this.validateByRangeRequest(request)
      const sessions = await this.dataGateway.deleteByRange(
        request.startInclusive,
        request.end
      )
      return await this.respond(sessions)
    } catch (error) {
      throw new SessionError(
        'Failed to delete sessions by range.',
        error as Error
      )
    }
  }

  private async executeByIDs(
    request: DeleteByIDs
  ): Promise<SessionListResponse> {
    try {
      await this.validateByIDsRequest(request)
      const sessions = await this.dataGateway.deleteByIDs(request.ids)
      return await this.respond(sessions)
    } catch (error) {
      throw new SessionError(
        'Failed to delete sessions by ids.',
        error as Error
      )
    }
  }

  private async respond(sessions: Session[]): Promise<SessionListResponse> {
    try {
      const response: SessionListResponse = {
        sessions: mapSessionListToResponse(sessions),
      }
      await this.presenter.present(response)
      return response
    } catch (error) {
      throw new SessionError('Failed sending out response.', error as Error)
    }
  }

  private async validateByRangeRequest(request: DeleteByRange) {
    return await RequestByRangeValidator.getInstance().validate(request)
  }

  private async validateByIDsRequest(request: DeleteByIDs) {
    return await RequestByIDsValidator.getInstance().validate(request)
  }
}
