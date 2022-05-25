import DefaultDurationPresenterInterface from '@/interactor/external-users/default-duration/io/DefaultDurationPresenterInterface'
import {
  DefaultDurationResponse,
  ReadDefaultDurationResponse,
  ResetDefaultDurationResponse,
  UpdateDefaultDurationResponse,
} from '@/interactor/external-users/default-duration/io/response.model'

import Duration from '@/examples/external-users-app/model/Duration'

import DefaultDurationViewInterface from './DefaultDurationViewInterface'

const mapResponse = (response: DefaultDurationResponse) => {
  return new Duration(
    response.id,
    response.pomodoro,
    response.short,
    response.long,
    response.interval
  )
}

export default class DurationPresenter
  implements DefaultDurationPresenterInterface
{
  private view: DefaultDurationViewInterface

  constructor(view: DefaultDurationViewInterface) {
    this.view = view
  }

  present(
    response:
      | ReadDefaultDurationResponse
      | UpdateDefaultDurationResponse
      | ResetDefaultDurationResponse
  ): Promise<Duration> {
    if (response.duration) {
      const duration = mapResponse(response.duration)
      this.view.render(duration)
      return Promise.resolve(duration)
    } else {
      return Promise.reject(
        new Error(
          `Failed to get the default duration from the given response: ${response}.`
        )
      )
    }
  }
}
