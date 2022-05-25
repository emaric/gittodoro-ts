import Duration from '@/interactor/entities/Duration'
import {
  MAX_INTERVAL,
  MAX_LONG,
  MAX_POMODORO,
  MAX_SHORT,
  MIN_INTERVAL,
  MIN_LONG,
  MIN_POMODORO,
  MIN_SHORT,
} from './constants'
import ValidatorError from '../errors/ValidatorError'
import ValidatorInterface from './ValidatorInterface'

export default class DurationConstraintsValidator
  implements ValidatorInterface<Duration>
{
  validate(duration: Duration) {
    const errors = []

    if (duration.pomodoro < MIN_POMODORO) {
      errors.push(
        new Error(`Pomodoro must be at least ${MIN_POMODORO} milliseconds.`)
      )
    }

    if (duration.pomodoro > MAX_POMODORO) {
      errors.push(
        new Error(`Pomodoro must not go over ${MAX_POMODORO} milliseconds.`)
      )
    }

    if (duration.short < MIN_SHORT) {
      errors.push(
        new Error(`Short must be at least ${MIN_SHORT} milliseconds.`)
      )
    }

    if (duration.short > MAX_SHORT) {
      errors.push(
        new Error(`Short must not go over ${MAX_SHORT} milliseconds.`)
      )
    }

    if (duration.long < MIN_LONG) {
      errors.push(new Error(`Long must be at least ${MIN_LONG} milliseconds.`))
    }

    if (duration.long > MAX_LONG) {
      errors.push(new Error(`Long must not go over ${MAX_LONG} milliseconds.`))
    }

    if (duration.interval < MIN_INTERVAL) {
      errors.push(
        new Error(`Interval must be at least ${MIN_INTERVAL} milliseconds.`)
      )
    }

    if (duration.interval > MAX_INTERVAL) {
      errors.push(
        new Error(`Interval must not go over ${MAX_INTERVAL} milliseconds.`)
      )
    }

    if (errors.length > 0) {
      throw new ValidatorError('Invalid duration.', ...errors)
    }

    return true
  }
}
