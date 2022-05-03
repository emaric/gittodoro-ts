import { StartSessionCommand } from '@/interactor/use-cases/StartSessionCommand'
import { StartSessionRequest } from '@/interactor/requests/SessionRequest'
import { SessionInMemoryStorage } from '@/tests/utils/SessionInMemoryStorage'
import { SessionStringOutputPresenter } from '@/tests/utils/SessionStringOutputPresenter'
import { mapSession } from '@/interactor/use-cases/mapper/EntityResponseMapper'
describe('[StartSessionCommand] unit tests', () => {
  describe('when trying to execute the start session command', () => {
    it('should create an incomplete session', async () => {
      const dataGateway = new SessionInMemoryStorage([])
      const presenter = new SessionStringOutputPresenter(
        'A session has started: '
      )
      const startSessionCommand = new StartSessionCommand(
        dataGateway,
        presenter
      )
      const request: StartSessionRequest = {
        timestamp: new Date(),
        message: 'This is my first session.',
        start: new Date('2022-04-12T00:00:00'),
        pomodoro: 50,
        short: 10,
        long: 20,
        longInterval: 4,
      }
      await startSessionCommand.execute(request)

      const expectedOutputIncludes = JSON.stringify(
        mapSession(dataGateway.storage[0])
      )

      expect(presenter.output.includes(expectedOutputIncludes)).toBe(true)
    })
  })
})
