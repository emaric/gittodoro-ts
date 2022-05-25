import Session from '@/interactor/entities/Session'
import SessionError from './error/SessionError'
import { CreateSessionsGatewayInterface } from './io/data.gateway'
import { mapSessionListToResponse } from './io/mapper'
import {
  CreateSessionsRequest,
  CreateWithDuration,
  CreateWithDurationID,
  RequestWith,
} from './io/request.model'
import { SessionListResponse } from './io/response.model'
import SessionCommandInterface from './io/SessionCommandInterface'
import SessionPresenterInterface from './io/SessionPresenterInterface'

export default class CreateSessionsCommand implements SessionCommandInterface {
  private dataGateway: CreateSessionsGatewayInterface
  private presenter: SessionPresenterInterface

  constructor(
    dataGateway: CreateSessionsGatewayInterface,
    presenter: SessionPresenterInterface
  ) {
    this.dataGateway = dataGateway
    this.presenter = presenter
  }

  async execute(request: CreateSessionsRequest): Promise<SessionListResponse> {
    try {
      if (request.with == RequestWith.duration) {
        return await this.executeWithDuration(request as CreateWithDuration)
      }

      if (request.with == RequestWith.durationID) {
        return await this.executeWithDurationID(request as CreateWithDurationID)
      }

      return Promise.reject(new SessionError('Invalid request type.'))
    } catch (error) {
      return Promise.reject(
        new SessionError('Failed to create sessions.', error as Error)
      )
    }
  }

  private async executeWithDuration(
    request: CreateWithDuration
  ): Promise<SessionListResponse> {
    try {
      const sessions = await this.dataGateway.createWithDuration(
        request.sessions.map((s) => ({
          ...s.duration,
          ...s,
        }))
      )
      return await this.respond(sessions)
    } catch (error) {
      return Promise.reject(
        new SessionError(
          'Failed to create Sessions with Duration.',
          error as Error
        )
      )
    }
  }

  private async executeWithDurationID(
    request: CreateWithDurationID
  ): Promise<SessionListResponse> {
    try {
      const sessions = await this.dataGateway.createWithDurationID(
        request.sessions.map((s) => ({
          durationId: s.duration.id,
          ...s,
        }))
      )
      return await this.respond(sessions)
    } catch (error) {
      return Promise.reject(
        new SessionError(
          'Failed to create Sessions with Duration ID.',
          error as Error
        )
      )
    }
  }

  private async respond(sessions: Session[]): Promise<SessionListResponse> {
    try {
      const response: SessionListResponse = {
        sessions: mapSessionListToResponse(sessions),
      }
      await this.presenter.present(response)
      return Promise.resolve(response)
    } catch (error) {
      return Promise.reject(
        new SessionError('Failed sending out response.', error as Error)
      )
    }
  }
}
