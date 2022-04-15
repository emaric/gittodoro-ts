import {
  SessionResponse,
  StateTimer as StateTimerResponse,
} from '../../interactor/responses/SessionResponse'
import { Session } from './models/Session'
import { State } from './models/State'
import { StateTimer } from './models/StateTimer'

export const mapTimerSequence = (
  timerSequence: StateTimerResponse[]
): StateTimer[] => {
  return timerSequence.map((ts) => ({
    state: (<any>State)[ts.state],
    duration: ts.duration,
  }))
}

export const mapSession = (session: SessionResponse): Session => {
  return new Session({
    ...session,
    timerSequence: mapTimerSequence(session.timerSequence),
  })
}
