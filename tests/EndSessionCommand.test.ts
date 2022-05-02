import { Duration } from '@/interactor/entities/Duration'
import { Session } from '@/interactor/entities/Session'
import { EndSessionRequest } from '@/interactor/requests/SessionRequest'
import { EndSessionCommand } from '@/interactor/use-cases/EndSessionCommand'
import { mapSession } from '@/interactor/use-cases/mapper/EntityResponseMapper'
import { SessionInMemoryStorage } from './utils/SessionInMemoryStorage'
import { SessionStringOutputPresenter } from './utils/SessionStringOutputPresenter'

describe('[EndSessionCommand] unit tests', () => {
  describe('when trying to execute the end session command', () => {
    it('should end the latest unfinished session', () => {
      const duration = new Duration({
        id: 0,
        pomodoro: 25,
        short: 5,
        long: 15,
        longInterval: 4,
      })

      const unfinishedSession = new Session({
        id: 0,
        start: new Date('2022-04-12T00:00:00'),
        duration: duration,
      })

      const dataGateway = new SessionInMemoryStorage([unfinishedSession])
      const presenter = new SessionStringOutputPresenter(
        'A session has ended: '
      )
      const endSessionCommand = new EndSessionCommand(dataGateway, presenter)
      const request: EndSessionRequest = {
        timestamp: new Date(),
        message: 'End my latest unfinished session.',
        end: new Date('2022-04-12T00:00:00'),
      }
      endSessionCommand.execute(request)

      const response = mapSession(dataGateway.storage[0])
      const expectedOutputIncludes = JSON.stringify(response)

      expect(presenter.output.includes(expectedOutputIncludes)).toBe(true)
    })
  })
})
