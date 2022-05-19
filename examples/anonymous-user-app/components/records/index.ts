import Session from '@/examples/anonymous-user-app/model/Session'
import Duration from '../../model/Duration'
import Record from '../../model/Record'

const _getState = (
  numberOfRecords: number,
  duration: Duration
): { state: string; durationMillis: number } => {
  if (numberOfRecords % 2 == 0) {
    return { state: 'pomodoro', durationMillis: duration.pomodoroMillis }
  } else if (numberOfRecords % (duration.longInterval * 2 - 1) == 0) {
    return { state: 'long', durationMillis: duration.longMillis }
  } else {
    return { state: 'short', durationMillis: duration.shortMillis }
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
    records.push(record)
  }
  return records
}

export const createRecordsForSession = (session: Session) => {
  if (session.end) {
    return _createRecords(session.duration, session.start, session.end)
  } else {
    return _createRecords(session.duration, session.start, session.maxEnd)
  }
}
