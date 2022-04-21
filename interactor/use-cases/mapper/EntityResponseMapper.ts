import { Session } from '@/interactor/entities/Session'
import { State } from '@/interactor/entities/State'
import { StateTimer } from '@/interactor/entities/StateTimer'
import { Note } from '@/interactor/entities/Note'

import {
  SessionResponse,
  StateTimer as StateTimerResponse,
} from '@/interactor/responses/SessionResponse'
import { NoteResponse } from '@/interactor/responses/NoteResponse'

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

export const mapSessions = (sessions: Session[]): SessionResponse[] => {
  return sessions.map((session) => mapSession(session))
}

export const mapNote = (note: Note): NoteResponse => {
  return {
    ...note,
  }
}
