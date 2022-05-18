import { Duration } from '@/interactor/entities/Duration'
import { Session } from '@/interactor/entities/Session'
import { ViewSessionsByRangeRequest } from '@/interactor/requests/SessionRequest'
import { mapSessions } from '@/interactor/use-cases/mapper/EntityResponseMapper'
import { ViewSessionsByRangeCommand } from '@/interactor/use-cases/ViewSessionsByRangeCommand'
import { SessionInMemoryStorage } from './utils/SessionInMemoryStorage'
import { SessionStringOutputPresenter } from './utils/SessionStringOutputPresenter'

describe('[ViewSessionsByRangeCommand] unit tests', () => {
  describe('when trying to execute View Session by range command', () => {
    it('should return session within the range', async () => {
      const duration = new Duration({
        id: '0',
        pomodoro: 25,
        short: 5,
        long: 15,
        longInterval: 4,
      })

      const sampleSession = new Session({
        id: 0,
        start: new Date('2022-04-12T09:00:00'),
        duration: duration,
      })

      const sampleOutOfRangeSession = new Session({
        id: 1,
        start: new Date('2022-04-11T09:20:00'),
        duration: duration,
      })

      const dataGateway = new SessionInMemoryStorage([
        sampleSession,
        sampleOutOfRangeSession,
      ])
      const sessionPresenter = new SessionStringOutputPresenter(
        'View sessions by range: '
      )
      const viewSessionsByRangeCommand = new ViewSessionsByRangeCommand(
        dataGateway,
        sessionPresenter
      )

      const request: ViewSessionsByRangeRequest = {
        timestamp: new Date(),
        message: 'View sessions by range',
        start: new Date('2022-04-12T00:00:00'),
        end: new Date('2022-04-13T00:00:00'),
      }

      await viewSessionsByRangeCommand.execute(request)

      const expectedOutputIncludes = JSON.stringify(
        mapSessions([sampleSession])
      )
      expect(sessionPresenter.output.includes(expectedOutputIncludes)).toBe(
        true
      )
    })
  })
})
