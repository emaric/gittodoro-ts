import SessionController from '@/examples/anonymous-user-app/controller/SessionController'
import StartSessionCommand from '@/interactor/anonymous-users/session/StartSessionCommand'
import StopSessionCommand from '@/interactor/anonymous-users/session/StopSessionCommand'

import StartSessionPresenter from '@/examples/anonymous-user-app/presenter/StartSessionPresenter'
import StopSessionPresenter from '@/examples/anonymous-user-app/presenter/StopSessionPresenter'
import SessionView from '@/examples/anonymous-user-app/view/SessionView'
import SessionInMemory from './SessionInMemory'

const view = new SessionView()
const startPresenter = new StartSessionPresenter(view)
const stopPresenter = new StopSessionPresenter(view)
const controller = new SessionController()

const db = new SessionInMemory()

const startInteractor = new StartSessionCommand(db, startPresenter)
const stopInteractor = new StopSessionCommand(db, stopPresenter)

export const getSession = () => {
  return view.session
}

export const start = (durationId: string, start = new Date()) => {
  console.log('\n')
  console.log(new Date().toJSON() + ' [info] Start a session...')
  console.log('\n')
  controller.start(startInteractor, { start, durationId })
}

export const stop = (date = new Date()) => {
  console.log('\n')
  console.log(new Date().toJSON() + ' [info] Stop the last active session...')
  console.log('\n')
  controller.stop(stopInteractor, { date })
}

export const onSessionChanged = (cb: CallableFunction) => {
  view.callback = cb
}
