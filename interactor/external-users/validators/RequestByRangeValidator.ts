import ValidatorError from '@/interactor/errors/ValidatorError'
import ValidatorInterface from '@/interactor/validators/ValidatorInterface'
import { RequestByRange } from '@/interactor/external-users/common/io/request.model'

export default class RequestByRangeValidator
  implements ValidatorInterface<RequestByRange>
{
  private static instance?: RequestByRangeValidator

  async validate(request: RequestByRange) {
    const errors = []
    if (request.startInclusive == undefined) {
      errors.push(new Error('startInclusive is required.'))
    }

    if (request.end == undefined) {
      errors.push(new Error('end is required.'))
    }

    if (request.end != undefined && request.startInclusive != undefined) {
      if (request.startInclusive.getTime() > request.end.getTime()) {
        errors.push(new Error('startInclusive is greater than the end'))
      }
    }

    if (errors.length > 0) {
      throw new ValidatorError('Invalid request values.', ...errors)
    } else {
      return true
    }
  }

  static getInstance() {
    if (RequestByRangeValidator.instance) {
      return RequestByRangeValidator.instance
    }
    RequestByRangeValidator.instance = new RequestByRangeValidator()
    return RequestByRangeValidator.instance
  }
}
