import DefaultDurationViewInterface from '@/examples/anonymous-user-app/presenter/DefaultDurationViewInterface'
import Duration from '@/examples/anonymous-user-app/model/Duration'
import { logger } from '@/examples/anonymous-user-app/components/loggers'

export default class DefaultDurationView
  implements DefaultDurationViewInterface
{
  private _defaultDuration: Duration | undefined
  callback: CallableFunction | undefined

  constructor(callback?: CallableFunction) {
    this.callback = callback
  }

  render(duration: Duration) {
    logger.debug('Rendering Default Duration...')
    logger.debug('Default Duration:', duration, '\n\n')

    this._defaultDuration = duration
    this.callback?.(duration)
  }

  get defaultDuration() {
    return this._defaultDuration
  }
}
