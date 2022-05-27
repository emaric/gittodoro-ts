import ValidatorInterface from '@/interactor/validators/ValidatorInterface'
import { RequestByIDs } from '@/interactor/external-users/common/io/request.model'
import ValidatorError from '@/interactor/errors/ValidatorError'

export default class RequestByIDsValidator
  implements ValidatorInterface<RequestByIDs>
{
  private static instance?: RequestByIDsValidator

  validate(request: RequestByIDs): Promise<boolean> {
    if (request.ids == undefined) {
      return Promise.reject(
        new ValidatorError(
          'Invalid request values.',
          new Error('IDs required.')
        )
      )
    }
    return Promise.resolve(true)
  }

  static getInstance() {
    if (RequestByIDsValidator.instance) {
      return RequestByIDsValidator.instance
    }
    RequestByIDsValidator.instance = new RequestByIDsValidator()
    return RequestByIDsValidator.instance
  }
}
