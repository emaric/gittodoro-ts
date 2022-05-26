import Session from '@/interactor/entities/Session'
import ValidatorError from '@/interactor/errors/ValidatorError'
import SessionError from './error/SessionError'
import { CreateSessionsGatewayInterface } from './io/data.gateway'
import { mapSessionListToResponse } from './io/mapper'
import {
  CreateSessionsRequest,
  CreateWithDuration,
  CreateWithDurationID,
  RequestWith,
  RequestWithDuration,
} from './io/request.model'
import { SessionListResponse } from './io/response.model'
import SessionCommandInterface from './io/SessionCommandInterface'
import SessionPresenterInterface from './io/SessionPresenterInterface'
import RequestWithDurationValidator from './validators/RequestWithDurationValidator'

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
      await this.validateRequest(request)
      if (request.with == RequestWith.duration) {
        return await this.executeWithDuration(request as CreateWithDuration)
      }

      if (request.with == RequestWith.durationID) {
        return await this.executeWithDurationID(request as CreateWithDurationID)
      }

      throw new SessionError('Invalid request type.')
    } catch (error) {
      return Promise.reject(
        new SessionError('Failed to create sessions.', error as Error)
      )
    }
  }

  private async validateRequest(request: CreateSessionsRequest) {
    try {
      if (request.with == RequestWith.duration) {
        await Promise.all(
          request.sessions.map((s) =>
            RequestWithDurationValidator.getInstance().validate(
              s as RequestWithDuration
            )
          )
        )
        return true
      }

      if (request.with == RequestWith.durationID) {
        request.sessions.forEach((session) => {
          if (session.duration.id == undefined) {
            throw new ValidatorError('Duration ID required.')
          }
        })
        return true
      }

      throw new ValidatorError('Not implemented.')
    } catch (error) {
      throw new ValidatorError('Invalid request values.', error as Error)
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
