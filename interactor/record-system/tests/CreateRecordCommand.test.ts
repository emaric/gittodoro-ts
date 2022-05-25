import Record from '@/interactor/entities/Record'
import { State } from '@/interactor/entities/State'

import { mapRequestToDuration } from '@/interactor/record-timer-system/io/mapper'
import { CreateRecordRequest } from '@/interactor/record-timer-system/io/request.model'
import CreateRecordCommand from '@/interactor/record-timer-system/CreateRecordCommand'

import ConsolePresenter from './utils/ConsolePresenter'

describe('[CreateRecordCommand] unit test', () => {
  describe('when trying to execute the create record command', () => {
    const durationRequest = {
      id: '0',
      pomodoro: 25 * 60 * 1000,
      short: 5 * 60 * 1000,
      long: 15 * 60 * 1000,
      interval: 4,
    }

    const duration = mapRequestToDuration(durationRequest)
    const presenter = new ConsolePresenter()

    it('should throw an Error for invalid input values', async () => {
      const command = new CreateRecordCommand(presenter)
      const start = new Date('2022-01-01T09:00:00')
      const current = new Date(start.getTime() - 1)
      const request: CreateRecordRequest = {
        duration,
        start,
        current,
      }
      await expect(command.execute(request)).rejects.toThrow()
    })

    it('should return a pomodoro Record to start a new cycle', async () => {
      const command = new CreateRecordCommand(presenter)
      const start = new Date('2022-01-01T09:00:00')
      const current = new Date(start.getTime() + duration.totalTime + 1)
      const request: CreateRecordRequest = {
        duration,
        start,
        current,
      }
      const response = await command.execute(request)

      const expectedStart = new Date(start.getTime() + duration.totalTime)
      const expected = {
        record: new Record(
          String(State[State.pomodoro]),
          expectedStart,
          new Date(expectedStart.getTime() + duration.pomodoro)
        ),
      }
      expect(response).toEqual(expected)
    })

    it('should return a pomodoro Record as the first record', async () => {
      const command = new CreateRecordCommand(presenter)
      const start = new Date('2022-01-01T09:00:00')
      const current = new Date(start.getTime() + 1)
      const request: CreateRecordRequest = {
        duration,
        start,
        current,
      }
      const response = await command.execute(request)

      const expectedStart = new Date(start.getTime())
      const expected = {
        record: new Record(
          String(State[State.pomodoro]),
          expectedStart,
          new Date(expectedStart.getTime() + duration.pomodoro)
        ),
      }
      expect(response).toEqual(expected)
    })

    it('should return a short Record as the second record', async () => {
      const command = new CreateRecordCommand(presenter)
      const start = new Date('2022-01-01T09:00:00')
      const current = new Date(start.getTime() + duration.pomodoro)
      const request: CreateRecordRequest = {
        duration,
        start,
        current,
      }
      const response = await command.execute(request)

      const expectedStart = new Date(start.getTime() + duration.pomodoro)
      const expected = {
        record: new Record(
          String(State[State.short]),
          expectedStart,
          new Date(expectedStart.getTime() + duration.short)
        ),
      }
      expect(response).toEqual(expected)
    })

    it('should return a pomodoro Record as the third record', async () => {
      const command = new CreateRecordCommand(presenter)
      const start = new Date('2022-01-01T09:00:00')
      const current = new Date(
        start.getTime() + duration.pomodoro + duration.short
      )
      const request: CreateRecordRequest = {
        duration,
        start,
        current,
      }
      const response = await command.execute(request)

      const expectedStart = new Date(
        start.getTime() + duration.pomodoro + duration.short
      )
      const expected = {
        record: new Record(
          String(State[State.pomodoro]),
          expectedStart,
          new Date(expectedStart.getTime() + duration.pomodoro)
        ),
      }
      expect(response).toEqual(expected)
    })
  })
})
