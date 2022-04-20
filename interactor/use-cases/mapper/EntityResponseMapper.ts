import { Session } from '@/interactor/entities/Session'
import { State } from '@/interactor/entities/State'
import { StateTimer } from '@/interactor/entities/StateTimer'
import { Note } from '@/interactor/entities/Note'

import {
  SessionResponse,
  SessionsByRangeResponse,
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

export const mapSessions = (sessions: Session[]): SessionsByRangeResponse => {
  if (sessions.length == 0) {
    throw new Error('No sessions to map.')
  }
  const firstSession = mapSession(sessions[0])
  const response: SessionsByRangeResponse = {
    ...firstSession,
    sessions: [firstSession],
  }
  if (sessions.length > 1) {
    response.sessions = sessions.map((session) => mapSession(session))
  }
  return response
}

export const mapNote = (note: Note): NoteResponse => {
  return {
    ...note,
  }
}
