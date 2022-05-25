import Session from '@/interactor/entities/Session'

export interface StartSessionGatewayInterface {
  start(start: Date, durationId: string): Promise<Session>
}

export interface StopSessionGatewayInterface {
  stop(date: Date): Promise<Session | undefined>
}

export interface ReadSessionsGatewayInterface {
  readByRange(startInclusive: Date, end: Date): Promise<Session[]>

  readByIDs(ids: string[]): Promise<Session[]>
}
