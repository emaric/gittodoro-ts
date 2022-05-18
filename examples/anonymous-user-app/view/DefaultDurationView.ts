import Duration from '../model/Duration'
import DefaultDurationViewInterface from '../presenter/DefaultDurationViewInterface'

export default class DefaultDurationView
  implements DefaultDurationViewInterface
{
  private _defaultDuration: Duration | undefined
  callback: CallableFunction | undefined

  constructor(callback?: CallableFunction) {
    this.callback = callback
  }

  render(duration: Duration) {
    console.log('\n')
    console.log(new Date().toJSON() + ' [info] Rendering Default Duration...')
    console.log(new Date().toJSON() + ' [info] Default Duration:')
    console.table(JSON.stringify(duration))
    console.log('\n')

    this._defaultDuration = duration
    this.callback?.(duration)
  }

  get defaultDuration() {
    return this._defaultDuration
  }
}
