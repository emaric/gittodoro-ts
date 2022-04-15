import { Session } from '@/interactor/entities/Session'
import { State } from '@/interactor/entities/State'
import { StateTimer } from '@/interactor/entities/StateTimer'
import {
  SessionResponse,
  StateTimer as StateTimerResponse,
} from '@/interactor/responses/SessionResponse'

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
