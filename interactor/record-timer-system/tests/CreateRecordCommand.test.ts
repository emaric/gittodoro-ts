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
      longInterval: 4,
    }

    const duration = mapRequestToDuration(durationRequest)
    const presenter = new ConsolePresenter()

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
  })
})
