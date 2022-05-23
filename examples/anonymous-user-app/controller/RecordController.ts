import CreateNthRecordCommand from '@/interactor/record-timer-system/CreateNthRecordCommand'
import CreateRecordCommand from '@/interactor/record-timer-system/CreateRecordCommand'
import {
  CreateNthRecordRequest,
  CreateRecordRequest,
} from '@/interactor/record-timer-system/io/request.model'

export default class RecordController {
  create(interactor: CreateRecordCommand, request: CreateRecordRequest) {
    return interactor.execute(request)
  }

  createNth(
    interactor: CreateNthRecordCommand,
    request: CreateNthRecordRequest
  ) {
    return interactor.execute(request)
  }
}
