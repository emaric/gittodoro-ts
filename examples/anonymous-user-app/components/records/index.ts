import Session from '@/examples/anonymous-user-app/model/Session'
import Duration from '@/examples/anonymous-user-app/model/Duration'
import Record from '@/examples/anonymous-user-app/model/Record'

const POMODORO = 'pomodoro'
const SHORT = 'short'
const LONG = 'long'

const _getState = (
  numberOfRecords: number,
  duration: Duration
): { state: string; durationMillis: number } => {
  if (numberOfRecords % 2 == 0) {
    return { state: POMODORO, durationMillis: duration.pomodoroMillis }
  } else if (((numberOfRecords + 1) / 2) % duration.longInterval == 0) {
    return { state: LONG, durationMillis: duration.longMillis }
  } else {
    return { state: SHORT, durationMillis: duration.shortMillis }
  }
}

export const createNextRecord = (
  recordsLength: number,
  duration: Duration,
  start: Date
) => {
  const { state, durationMillis } = _getState(recordsLength, duration)
  const end = new Date(start.getTime() + durationMillis)
  return new Record(state, start, end)
}

const _createRecords = (duration: Duration, start: Date, end: Date) => {
  const firstRecord = createNextRecord(0, duration, start)
  const records = [firstRecord]
  let record = firstRecord
  while (record.end.getTime() < end.getTime()) {
    record = createNextRecord(records.length, duration, record.end)
    if (record.end.getTime() >= end.getTime()) {
      records.push(new Record(record.state, record.start, end))
    } else {
      records.push(record)
    }
  }
  return records
}

export const createRecordsForSession = (session: Session, end: Date) => {
  return _createRecords(session.duration, session.start, end)
}

export const getCurrentRecord = (current: Date, session: Session) => {
  const start = session.start
  const duration = session.duration
  const numberOfRecords = calcNumberOfRecords(duration, session.elapsedMillis)
  const calculatedStart = calcCurrentRecordStartTime(duration, start, current)
  return createNextRecord(numberOfRecords, duration, calculatedStart)
}

export const calcCurrentRecordStartTime = (
  duration: Duration,
  start: Date,
  current: Date
) => {
  const elapsedMillis = current.getTime() - start.getTime()
  const completedCyclesMillis =
    elapsedMillis - (elapsedMillis % duration.totalMillis)

  return new Date(start.getTime() + completedCyclesMillis)
}

export const calcNumberOfRecords = (
  duration: Duration,
  elapsedMillis: number
) => {
  const cycleMillis = duration.totalMillis
  const completedCycles =
    Math.floor(elapsedMillis / cycleMillis) * (duration.longInterval * 2)
  const remainder = elapsedMillis % cycleMillis

  const reachedLong = remainder > cycleMillis - duration.longMillis
  if (reachedLong) {
    return completedCycles + duration.longInterval * 2 - 1
  }
  const reachedLastPomodoro =
    remainder > cycleMillis - (duration.longMillis + duration.pomodoroMillis)
  if (reachedLastPomodoro) {
    return completedCycles + duration.longInterval
  }

  const completedPomodoroAndShortCycles =
    Math.floor(remainder / (duration.pomodoroMillis + duration.shortMillis)) * 2

  const remainderPomodoroAndShort =
    remainder % (duration.pomodoroMillis + duration.shortMillis)

  const reachedLastShort = remainderPomodoroAndShort > duration.pomodoroMillis
  if (reachedLastShort) {
    return completedCycles + completedPomodoroAndShortCycles + 1
  } else {
    return completedCycles + completedPomodoroAndShortCycles
  }
}
