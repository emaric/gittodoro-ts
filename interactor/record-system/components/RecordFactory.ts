import Duration from '@/interactor/entities/Duration'
import Record from '@/interactor/entities/Record'
import { State } from '@/interactor/entities/State'

import RecordError from '@/interactor/record-system/error/RecordError'

export default class RecordBuilder {
  private duration: Duration

  constructor(duration: Duration) {
    this.duration = duration
  }

  private get recordsPerCycle() {
    return this.duration.interval * 2
  }

  createRecord(start: Date, estimatedEnd: Date) {
    if (estimatedEnd.getTime() < start.getTime()) {
      throw new RecordError('Ivalid current date.')
    }

    const nthRecord = this.calculateNRecords(
      estimatedEnd.getTime() - start.getTime()
    )
    const state = this.calculateState(nthRecord)
    const startDate = this.calculateStart(nthRecord, start)
    const endDate = this.calculateEnd(state, startDate)
    return new Record(String(State[state]), startDate, endDate)
  }

  createNthRecord(n: number, start: Date) {
    if (n <= 0) {
      throw new RecordError('Invalid value for n.')
    }
    const state = this.calculateState(n)
    const startDate = this.calculateStart(n, start)
    const endDate = this.calculateEnd(state, startDate)
    return new Record(String(State[state]), startDate, endDate)
  }

  createAllRecords(start: Date, end: Date) {
    if (end.getTime() < start.getTime()) {
      throw new RecordError('Invalid start and end date.')
    }

    let errorMessage = `${
      end.getTime() - start.getTime()
    }, : ${end.toJSON()} ${start.toJSON()}`

    const recordCount = this.calculateNRecords(end.getTime() - start.getTime())
    errorMessage = errorMessage + ' : recordCount: ' + recordCount

    try {
      const records = [this.createNthRecord(1, start)]

      Array.from(Array(recordCount - 1)).forEach(() => {
        const last = records[records.length - 1]
        const state = this.calculateState(records.length + 1)
        const startDate = last.end
        const endDate = this.calculateEnd(state, startDate)
        const record = new Record(String(State[state]), startDate, endDate)
        records.push(record)
      })

      return records
    } catch (error) {
      throw new RecordError(
        'Failed while trying to create all records in RecordFacotry.\n' +
          errorMessage,
        error as Error
      )
    }
  }

  private calculateNRecords(elapsed: number) {
    if (elapsed <= 0) {
      return 1
    }

    const cycles = Math.floor(elapsed / this.duration.totalTime)
    const recordsPerCycle = cycles * this.recordsPerCycle

    const remainingTime = elapsed % this.duration.totalTime

    if (remainingTime == 0) {
      return recordsPerCycle + 1
    }

    if (remainingTime >= this.duration.totalTime - this.duration.long) {
      return recordsPerCycle + this.recordsPerCycle
    }

    if (
      remainingTime >=
      this.duration.totalTime - this.duration.long - this.duration.pomodoro
    ) {
      return recordsPerCycle + this.recordsPerCycle - 1
    }

    const shortCycles = Math.floor(
      remainingTime / this.duration.pomodoroAndShort
    )
    const recordsPerShortCycles = shortCycles * 2

    const remainder = remainingTime % this.duration.pomodoroAndShort

    if (remainder >= this.duration.pomodoro) {
      return recordsPerCycle + recordsPerShortCycles + 2
    }

    return recordsPerCycle + recordsPerShortCycles + 1
  }

  private calculateState(nthRecord: number) {
    if (nthRecord <= 0) {
      throw new RecordError('Invalid nth record value.')
    }

    const baseRecords = nthRecord % this.recordsPerCycle
    if (baseRecords == 0) {
      return State.long
    }

    if (baseRecords == this.recordsPerCycle - 1 || baseRecords % 2 != 0) {
      return State.pomodoro
    }

    return State.short
  }

  private calculateStart(nthRecord: number, start: Date) {
    if (nthRecord <= 0) {
      throw new RecordError('Invalid nth record.')
    }

    const recordIndex = nthRecord - 1

    const completedCyclesMillis =
      Math.floor(recordIndex / this.recordsPerCycle) * this.duration.totalTime

    const remainingRecords = recordIndex % this.recordsPerCycle

    if (remainingRecords == this.recordsPerCycle - 1) {
      return new Date(
        start.getTime() +
          completedCyclesMillis +
          (this.duration.totalTime - this.duration.long)
      )
    }

    const remainingShortRecords = Math.floor(remainingRecords / 2)
    const remainingShort = this.duration.short * remainingShortRecords
    const remainingPomodoro =
      this.duration.pomodoro * (remainingRecords - remainingShortRecords)

    return new Date(
      start.getTime() +
        completedCyclesMillis +
        remainingShort +
        remainingPomodoro
    )
  }

  private calculateEnd(state: State, start: Date) {
    if (state == State.pomodoro) {
      return new Date(start.getTime() + this.duration.pomodoro)
    }

    if (state == State.short) {
      return new Date(start.getTime() + this.duration.short)
    }

    return new Date(start.getTime() + this.duration.long)
  }
}
