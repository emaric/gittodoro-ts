import ReadDefaultDurationCommand from '@/interactor/anonymous-users/default-duration/ReadDefaultDurationCommand'
import ResetDefaultDurationCommand from '@/interactor/anonymous-users/default-duration/ResetDefaultDurationCommand'
import UpdateDefaultDurationCommand from '@/interactor/anonymous-users/default-duration/UpdateDefaultDurationCommand'

import DurationController from '@/examples/anonymous-user-app/controller/DefaultDurationController'
import DurationPresenter from '@/examples/anonymous-user-app/presenter/DurationPresenter'
import DefaultDurationView from '@/examples/anonymous-user-app/view/DefaultDurationView'

import DefaultDurationInMemory from './DefaultDurationInMemory'

const defaultDurationView = new DefaultDurationView()

const db = new DefaultDurationInMemory()
const presenter = new DurationPresenter(defaultDurationView)
const controller = new DurationController()

const readInteractor = new ReadDefaultDurationCommand(db, presenter)
const updateInteractor = new UpdateDefaultDurationCommand(db, presenter)
const resetInteractor = new ResetDefaultDurationCommand(db, presenter)

controller.getDefault(readInteractor)

export const getDefaultDuration = () => {
  return defaultDurationView.defaultDuration
}

export const updateDefaultDuration = (
  pomodoro: number,
  short: number,
  long: number,
  longInterval: number
) => {
  controller.setDefault(updateInteractor, {
    pomodoro,
    short,
    long,
    longInterval,
  })
}

export const resetDefaultDuration = () => {
  controller.resetDefault(resetInteractor)
}

export const onDefaultDurationChanged = (cb: CallableFunction) => {
  defaultDurationView.callback = cb
}
