import Duration from '@/interactor/entities/Duration'

import DurationConstraintsValidator from './DurationConstraintsValidator'
import ValidatorInterface from './ValidatorInterface'

export default class Validator<T> implements ValidatorInterface<T> {
  private durationValidator?: DurationConstraintsValidator

  validate(object: T): boolean {
    if (object instanceof Duration) {
      if (this.durationValidator == undefined) {
        this.durationValidator = new DurationConstraintsValidator()
      }
      return this.durationValidator.validate(object)
    }
    throw new Error('Not implemented.')
  }
}
