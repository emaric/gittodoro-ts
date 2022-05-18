import { Duration } from '@/interactor/entities/Duration'
import { Session } from '@/interactor/entities/Session'
import { ViewFirstAndLastSessionsRequest } from '@/interactor/requests/SessionRequest'
import { ViewFirstAndLastSessionsCommand } from '@/interactor/use-cases/ViewFirstAndLastSessionsCommand'

import { SessionInMemoryStorage } from './utils/SessionInMemoryStorage'
import { SessionStringOutputPresenter } from './utils/SessionStringOutputPresenter'

describe('[ViewFirstAndLastSessions] unit tests', () => {
  describe('when trying to execute view first and last sessions command', () => {
    it('should return a size 2 array containing the first and last sessions', async () => {
      const duration = new Duration({
        id: '-1',
        pomodoro: 25,
        short: 5,
        long: 15,
        longInterval: 4,
      })
      const sessions: Session[] = Array.from(Array(5)).map(
        (_, i) =>
          new Session({
            id: i,
            start: new Date(`2022-04-0${i + 1}T09:00:00`),
            end: new Date(`2022-04-0${i + 1}T17:00:00`),
            duration: duration,
          })
      )
      const db = new SessionInMemoryStorage(sessions)
      const presenter = new SessionStringOutputPresenter(
        'View Session Details: '
      )

      const request: ViewFirstAndLastSessionsRequest = {
        timestamp: new Date(),
        message: 'View First and Last Sessions',
      }

      const command = new ViewFirstAndLastSessionsCommand(db, presenter)
      await command.execute(request)

      expect(presenter.output.includes('"id":0')).toBe(true)
      expect(presenter.output.includes('"id":1')).toBe(false)
      expect(presenter.output.includes('"id":2')).toBe(false)
      expect(presenter.output.includes('"id":3')).toBe(false)
      expect(presenter.output.includes('"id":4')).toBe(true)
    })
  })
})
