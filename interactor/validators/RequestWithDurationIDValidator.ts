import ValidatorError from '@/interactor/errors/ValidatorError'
import ValidatorInterface from '@/interactor/validators/ValidatorInterface'
import { RequestWithDurationID } from '../common/io/request.model'

export default class RequestWithDurationIDValidator
  implements ValidatorInterface<RequestWithDurationID>
{
  private static instance: RequestWithDurationIDValidator

  validate(request: RequestWithDurationID): Promise<boolean> {
    const errors: Error[] = []

    if (request.duration == undefined) {
      errors.push(new Error('Duration required.'))
    } else {
      if (request.duration.id == undefined) {
        errors.push(new Error('Duration ID required.'))
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
    if (RequestWithDurationIDValidator.instance) {
      return RequestWithDurationIDValidator.instance
    }
    RequestWithDurationIDValidator.instance =
      new RequestWithDurationIDValidator()
    return RequestWithDurationIDValidator.instance
  }
}
