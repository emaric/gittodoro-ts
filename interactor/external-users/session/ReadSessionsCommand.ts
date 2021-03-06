import Session from '@/interactor/entities/Session'
import { RequestBy } from '@/interactor/external-users/common/io/request.model'
import RequestByRangeValidator from '@/interactor/external-users/validators/RequestByRangeValidator'
import RequestByIDsValidator from '../validators/RequestByIDsValidator'

import SessionError from './error/SessionError'
import { ReadSessionsGatewayInterface } from './io/data.gateway'
import { mapSessionListToResponse } from './io/mapper'
import { ReadByIDs, ReadByRange, ReadSessionsRequest } from './io/request.model'
import { SessionListResponse } from './io/response.model'
import SessionCommandInterface from './io/SessionCommandInterface'
import SessionPresenterInterface from './io/SessionPresenterInterface'

export default class ReadSessionsCommand implements SessionCommandInterface {
  private dataGateway: ReadSessionsGatewayInterface
  private presenter: SessionPresenterInterface

  constructor(
    dataGateway: ReadSessionsGatewayInterface,
    presenter: SessionPresenterInterface
  ) {
    this.dataGateway = dataGateway
    this.presenter = presenter
  }

  async execute(request: ReadSessionsRequest): Promise<SessionListResponse> {
    try {
      if (request.by == RequestBy.range) {
        return await this.executeByRange(request as ReadByRange)
      }

      if (request.by == RequestBy.ids) {
        return await this.executeByIDs(request as ReadByIDs)
      }

      throw new SessionError('Invalid request type.')
    } catch (error) {
      throw new SessionError('Failed to read sessions.', error as Error)
    }
  }

  private async executeByRange(
    request: ReadByRange
  ): Promise<SessionListResponse> {
    try {
      await this.validateByRangeRequest(request)
      const sessions = await this.dataGateway.readByRange(
        request.startInclusive,
        request.end
      )
      return await this.respond(sessions)
    } catch (error) {
      throw new SessionError(
        'Failed to read sessions by range.',
        error as Error
      )
    }
  }

  private async executeByIDs(request: ReadByIDs): Promise<SessionListResponse> {
    try {
      await this.validateByIDsRequest(request)
      const sessions = await this.dataGateway.readByIDs(request.ids)
      return await this.respond(sessions)
    } catch (error) {
      throw new SessionError('Failed to read sessions by ids.', error as Error)
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

  private async validateByRangeRequest(request: ReadByRange) {
    return await RequestByRangeValidator.getInstance().validate(request)
  }

  private async validateByIDsRequest(request: ReadByIDs) {
    return await RequestByIDsValidator.getInstance().validate(request)
  }
}
