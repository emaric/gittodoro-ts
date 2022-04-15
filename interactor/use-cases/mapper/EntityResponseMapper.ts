import { Session } from '../../entities/Session'
import { State } from '../../entities/State'
import { StateTimer } from '../../entities/StateTimer'
import {
  SessionResponse,
  StateTimer as StateTimerResponse,
} from '../../responses/SessionResponse'

export const mapTimerSequence = (
  timerSequence: StateTimer[]
): StateTimerResponse[] => {
  return timerSequence.map<StateTimerResponse>((stateTimer) => ({
    state: State[stateTimer.state],
    duration: stateTimer.duration,
  }))
}

export const mapSession = (session: Session): SessionResponse => {
  return {
    ...session,
    ...session.duration,
    timerSequenceDuration: session.timerSequenceDuration,
    timerSequence: mapTimerSequence(session.timerSequence),
  }
}
