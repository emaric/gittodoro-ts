import Session from '@/interactor/entities/Session'
import ValidatorError from '@/interactor/errors/ValidatorError'
import SessionError from './error/SessionError'

import { StartSessionGatewayInterface } from './io/data.gateway'
import { mapSessionToResponse } from './io/mapper'
import {
  StartSessionRequest,
  StartSessionWithDurationIDRequest,
  StartSessionWithDurationRequest,
} from './io/request.model'
import { StartSessionResponse } from './io/response.model'
import SessionCommandInterface from './io/SessionCommandInterface'
import SessionPresenterInterface from './io/SessionPresenterInterface'
import RequestWithDurationIDValidator from '../../validators/RequestWithDurationIDValidator'
import { RequestWith } from '@/interactor/common/io/request.model'
import RequestWithDurationValidator from '@/interactor/validators/RequestWithDurationValidator'

export default class StartSessionCommand implements SessionCommandInterface {
  private dataGateway: StartSessionGatewayInterface
  private presenter: SessionPresenterInterface

  constructor(
    dataGateway: StartSessionGatewayInterface,
    presenter: SessionPresenterInterface
  ) {
    this.dataGateway = dataGateway
    this.presenter = presenter
  }

  async execute(request: StartSessionRequest): Promise<StartSessionResponse> {
    try {
      await this.validateRequest(request)

      if (request.with == RequestWith.duration) {
        return await this.executeWithDuration(
          request as StartSessionWithDurationRequest
        )
      }

      if (request.with == RequestWith.durationID) {
        return await this.executeWithDurationID(
          request as StartSessionWithDurationIDRequest
        )
      }

      throw new SessionError('Not implemented.')
    } catch (error) {
      return Promise.reject(
        new SessionError('Failed to start a session.', error as Error)
      )
    }
  }

  private async executeWithDuration(
    request: StartSessionWithDurationRequest
  ): Promise<StartSessionResponse> {
    try {
      const { pomodoro, short, long, interval } = request.duration
      const session = await this.dataGateway.startWithDuration(
        request.start,
        pomodoro,
        short,
        long,
        interval
      )

      return await this.respond(session)
    } catch (error) {
      return Promise.reject(
        new SessionError(
          'Failed to start a Session with Duration.',
          error as Error
        )
      )
    }
  }

  private async executeWithDurationID(
    request: StartSessionWithDurationIDRequest
  ): Promise<StartSessionResponse> {
    try {
      const session = await this.dataGateway.startWithDurationID(
        request.start,
        request.duration.id
      )
      return await this.respond(session)
    } catch (error) {
      return Promise.reject(
        new SessionError(
          'Failed to start a Session with Duration ID.',
          error as Error
        )
      )
    }
  }

  private async respond(session: Session): Promise<StartSessionResponse> {
    try {
      const response: StartSessionResponse = {
        session: mapSessionToResponse(session),
      }
      await this.presenter.present(response)
      return Promise.resolve(response)
    } catch (error) {
      return Promise.reject(
        new SessionError('Failed sending out response.', error as Error)
      )
    }
  }

  private async validateRequest(request: StartSessionRequest) {
    if (request.with == RequestWith.duration) {
      await RequestWithDurationValidator.getInstance().validate(
        request as StartSessionWithDurationRequest
      )
      return true
    }

    if (request.with == RequestWith.durationID) {
      await RequestWithDurationIDValidator.getInstance().validate(
        request as StartSessionWithDurationIDRequest
      )
      return true
    }

    throw new ValidatorError('Not implemented.')
  }
}
