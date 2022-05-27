import {
  ReadDefaultDurationDataGatewayInterface,
  UpdateDefaultDurationDataGatewayInterface,
} from '@/interactor/external-users/default-duration/io/data.gateway'
import {
  StartSessionGatewayInterface,
  StopSessionGatewayInterface,
} from '@/interactor/external-users/session/io/data.gateway'
import Duration from '@/interactor/entities/Duration'
import Session from '@/interactor/entities/Session'
import DefaultDurationInMemory from './DefaultDurationInMemory'
import SessionInMemory from './SessionInMemory'

export class SessionTimerGateway
  implements
    ReadDefaultDurationDataGatewayInterface,
    UpdateDefaultDurationDataGatewayInterface,
    StartSessionGatewayInterface,
    StopSessionGatewayInterface
{
  private sessionGateway: SessionInMemory
  private durationGateway: DefaultDurationInMemory

  constructor() {
    this.sessionGateway = new SessionInMemory()
    this.durationGateway = new DefaultDurationInMemory()
  }

  getDefaultDuration(): Promise<Duration> {
    return this.durationGateway.getDefaultDuration()
  }

  updateDefaultDuration(
    pomodoro: number,
    short: number,
    long: number,
    interval: number
  ): Promise<Duration> {
    return this.durationGateway.updateDefaultDuration(
      pomodoro,
      short,
      long,
      interval
    )
  }

  startWithDurationID(start: Date, durationId: string): Promise<Session> {
    return this.sessionGateway.startWithDurationID(start, durationId)
  }

  startWithDuration(
    start: Date,
    pomodoro: number,
    short: number,
    long: number,
    interval: number
  ): Promise<Session> {
    return this.sessionGateway.startWithDuration(
      start,
      pomodoro,
      short,
      long,
      interval
    )
  }

  stop(date: Date): Promise<Session | undefined> {
    return this.sessionGateway.stop(date)
  }
}
