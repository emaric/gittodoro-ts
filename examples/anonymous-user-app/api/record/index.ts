import CreateRecordCommand from '@/interactor/record-timer-system/CreateRecordCommand'
import RecordController from '@/examples/anonymous-user-app/controller/RecordController'
import CreateRecordPresenter from '../../presenter/CreateRecordPresenter'
import RecordView from '../../view/RecordView'
import Duration from '../../model/Duration'
import CreateNthRecordCommand from '@/interactor/record-timer-system/CreateNthRecordCommand'

const view = new RecordView()
const recordPresenter = new CreateRecordPresenter(view)
const controller = new RecordController()

const createInteractor = new CreateRecordCommand(recordPresenter)
const createNthInteractor = new CreateNthRecordCommand(recordPresenter)

export const getRecord = () => {
  return view.record
}

export const create = (duration: Duration, start: Date, current: Date) => {
  console.log('\n')
  console.log(new Date().toJSON() + ' [info] Create a record...')
  console.log('\n')

  controller.create(createInteractor, { duration, start, current })
}

export const createNth = (duration: Duration, n: number, start: Date) => {
  console.log('\n')
  console.log(new Date().toJSON() + ' [info] Create nth record...')
  console.log('\n')

  controller.createNth(createNthInteractor, { duration, n, start })
}

export const onRecordChanged = (cb: CallableFunction) => {
  view.callback = cb
}
