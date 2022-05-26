import ValidatorError from '@/interactor/errors/ValidatorError'
import ValidatorInterface from '@/interactor/validators/ValidatorInterface'
import { RequestWithDuration } from '../io/request.model'

export default class RequestWithDurationValidator
  implements ValidatorInterface<RequestWithDuration>
{
  private static instance: RequestWithDurationValidator

  validate(request: RequestWithDuration): Promise<boolean> {
    const errors: Error[] = []

    if (request.duration == undefined) {
      errors.push(new Error('duration required'))
    } else {
      if (request.duration.pomodoro == undefined) {
        errors.push(new Error('duration.pomodoro required'))
      }
      if (request.duration.short == undefined) {
        errors.push(new Error('duration.short required'))
      }
      if (request.duration.long == undefined) {
        errors.push(new Error('duration.long required'))
      }
      if (request.duration.interval == undefined) {
        errors.push(new Error('duration.interval required'))
      }
    }

    if (errors.length > 0) {
      return Promise.reject(
        new ValidatorError('Invalid request values.', ...errors)
      )
    }

    return Promise.resolve(true)
  }

  static getInstance() {
    if (RequestWithDurationValidator.instance) {
      return RequestWithDurationValidator.instance
    }
    RequestWithDurationValidator.instance = new RequestWithDurationValidator()
    return RequestWithDurationValidator.instance
  }
}
