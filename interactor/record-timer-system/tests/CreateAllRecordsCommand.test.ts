import Record from '@/interactor/entities/Record'
import { State } from '@/interactor/entities/State'

import { mapRequestToDuration } from '@/interactor/record-timer-system/io/mapper'
import { CreateAllRecordsRequest } from '@/interactor/record-timer-system/io/request.model'
import CreateAllRecordsCommand from '@/interactor/record-timer-system/CreateAllRecordsCommand'

import ConsolePresenter from './utils/ConsolePresenter'

describe('[CreateAllRecordsCommand] unit test', () => {
  describe('when trying to execute the create all records command', () => {
    const durationRequest = {
      id: '0',
      pomodoro: 25 * 60 * 1000,
      short: 5 * 60 * 1000,
      long: 15 * 60 * 1000,
      longInterval: 4,
    }

    const duration = mapRequestToDuration(durationRequest)
    const presenter = new ConsolePresenter()

    it('should throw an Error for invalid start and end dates', async () => {
      const command = new CreateAllRecordsCommand(presenter)
      const start = new Date('2022-01-01T09:00:00')
      const end = new Date(start.getTime() - 1)
      const request: CreateAllRecordsRequest = {
        duration,
        start,
        end,
      }
      await expect(command.execute(request)).rejects.toThrow()
    })

    it('should return an array of records with 1 cycle and a pomodoro', async () => {
      const command = new CreateAllRecordsCommand(presenter)
      const start = new Date('2022-01-01T09:00:00')
      const end = new Date(start.getTime() + duration.totalTime)
      const request: CreateAllRecordsRequest = {
        duration,
        start,
        end,
      }
      const response = await command.execute(request)

      const records = [
        new Record(
          'pomodoro',
          start,
          new Date(start.getTime() + duration.pomodoro)
        ),
      ]

      const last = () => {
        return records[records.length - 1]
      }

      const calcEnd = (ms: number) => {
        return new Date(last().end.getTime() + ms)
      }

      records.push(new Record('short', last().end, calcEnd(duration.short)))
      records.push(
        new Record('pomodoro', last().end, calcEnd(duration.pomodoro))
      )
      records.push(new Record('short', last().end, calcEnd(duration.short)))
      records.push(
        new Record('pomodoro', last().end, calcEnd(duration.pomodoro))
      )
      records.push(new Record('short', last().end, calcEnd(duration.short)))
      records.push(
        new Record('pomodoro', last().end, calcEnd(duration.pomodoro))
      )
      records.push(new Record('long', last().end, calcEnd(duration.long)))
      records.push(
        new Record('pomodoro', last().end, calcEnd(duration.pomodoro))
      )

      const expected = {
        records,
      }
      expect(response).toEqual(expected)
    })

    it('should return an array with the first record', async () => {
      const command = new CreateAllRecordsCommand(presenter)
      const start = new Date('2022-01-01T09:00:00')
      const end = new Date(start.getTime() + 1)
      const request: CreateAllRecordsRequest = {
        duration,
        start,
        end,
      }
      const response = await command.execute(request)

      const expectedStart = new Date(start.getTime())
      const expected = {
        records: [
          new Record(
            String(State[State.pomodoro]),
            expectedStart,
            new Date(expectedStart.getTime() + duration.pomodoro)
          ),
        ],
      }
      expect(response).toEqual(expected)
    })

    it('should return a array with the second record', async () => {
      const command = new CreateAllRecordsCommand(presenter)
      const start = new Date('2022-01-01T09:00:00')
      const end = new Date(start.getTime() + duration.pomodoro)
      const request: CreateAllRecordsRequest = {
        duration,
        start,
        end,
      }
      const response = await command.execute(request)

      const expectedStart = new Date(start.getTime() + duration.pomodoro)
      const expected = {
        records: [
          new Record(
            String(State[State.pomodoro]),
            start,
            new Date(start.getTime() + duration.pomodoro)
          ),
          new Record(
            String(State[State.short]),
            expectedStart,
            new Date(expectedStart.getTime() + duration.short)
          ),
        ],
      }
      expect(response).toEqual(expected)
    })

    it('should return an array with the third record', async () => {
      const command = new CreateAllRecordsCommand(presenter)
      const start = new Date('2022-01-01T09:00:00')
      const end = new Date(start.getTime() + duration.pomodoro + duration.short)
      const request: CreateAllRecordsRequest = {
        duration,
        start,
        end,
      }
      const response = await command.execute(request)

      const expectedStart = new Date(
        start.getTime() + duration.pomodoro + duration.short
      )
      const expected = {
        records: [
          new Record(
            String(State[State.pomodoro]),
            start,
            new Date(start.getTime() + duration.pomodoro)
          ),
          new Record(
            String(State[State.short]),
            new Date(start.getTime() + duration.pomodoro),
            new Date(start.getTime() + duration.pomodoro + duration.short)
          ),
          new Record(
            String(State[State.pomodoro]),
            expectedStart,
            new Date(expectedStart.getTime() + duration.pomodoro)
          ),
        ],
      }
      expect(response).toEqual(expected)
    })
  })
})
