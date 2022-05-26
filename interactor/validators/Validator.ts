import Duration from '@/interactor/entities/Duration'
import ValidatorError from '@/interactor/errors/ValidatorError'

import DurationConstraintsValidator from './DurationConstraintsValidator'
import ValidatorInterface from './ValidatorInterface'

export default class Validator<T> implements ValidatorInterface<T> {
  private static instance?: Validator<unknown>

  private durationValidator?: DurationConstraintsValidator

  async validate(object: T) {
    if (object instanceof Duration) {
      if (this.durationValidator == undefined) {
        this.durationValidator = new DurationConstraintsValidator()
      }
      return await this.durationValidator.validate(object)
    }
    throw new ValidatorError(
      `Validator for ${typeof object} has not been implemented.`
    )
  }

  static getInstance() {
    if (this.instance) {
      return this.instance
    }
    this.instance = new Validator()
    return this.instance
  }
}
