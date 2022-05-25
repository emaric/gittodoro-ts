import Duration from '@/interactor/entities/Duration'
import Validator from '@/interactor/validators/Validator'
import DefaultDurationCommandInterface from './DefaultDurationCommandInterface'

export default class DefaultDurationCommandAbstract
  implements DefaultDurationCommandInterface
{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  execute(request?: unknown): Promise<unknown> {
    throw new Error('Method not implemented.')
  }

  protected validate(duration: Duration) {
    return Validator.getInstance().validate(duration)
  }
}
