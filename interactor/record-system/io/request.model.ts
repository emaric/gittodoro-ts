import { RequestWithDuration } from '@/interactor/common/io/request.model'

export type RecordBaseRequest = unknown

export type CreateRecordRequest = RecordBaseRequest &
  RequestWithDuration & {
    start: Date
    current: Date
  }

export type CreateNthRecordRequest = RecordBaseRequest &
  RequestWithDuration & {
    n: number
    start: Date
  }

export type CreateAllRecordsRequest = RecordBaseRequest &
  RequestWithDuration & {
    start: Date
    end: Date
  }
