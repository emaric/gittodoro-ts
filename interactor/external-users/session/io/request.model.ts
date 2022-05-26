import {
  RequestBy,
  RequestByIDs,
  RequestByRange,
} from '@/interactor/external-users/common/io/request.model'

export type SessionBaseRequest = unknown

export type DurationRequest = {
  id?: string
  pomodoro: number
  short: number
  long: number
  interval: number
}

export type RequestWithDurationID = {
  duration: { id: string }
}

export type RequestWithDuration = {
  duration: DurationRequest
}

export type SessionRequestWithDurationID = RequestWithDurationID & {
  start: Date
  end?: Date
  id?: string
}

export type SessionRequestWithDuration = RequestWithDuration & {
  start: Date
  end?: Date
  id?: string
}

export type StartSessionRequest = SessionBaseRequest & {
  start: Date
  durationId: string
}

export type StopSessionRequest = SessionBaseRequest & {
  date: Date
}

export type CreateSessionsRequest = SessionBaseRequest & {
  with: RequestWith
  sessions: SessionRequestWithDurationID[] | SessionRequestWithDuration[]
}

export type CreateWithDurationID = CreateSessionsRequest & {
  sessions: SessionRequestWithDurationID[]
}

export type CreateWithDuration = CreateSessionsRequest & {
  sessions: SessionRequestWithDuration[]
}

export type ReadSessionsRequest = SessionBaseRequest & {
  by: RequestBy
}

export type ReadByRange = ReadSessionsRequest & RequestByRange

export type ReadByIDs = ReadSessionsRequest & RequestByIDs

export type DeleteSessionsRequest = SessionBaseRequest & {
  by: RequestBy
}

export type DeleteByRange = DeleteSessionsRequest & RequestByRange

export type DeleteByIDs = DeleteSessionsRequest & RequestByIDs

export enum RequestWith {
  durationID,
  duration,
}
