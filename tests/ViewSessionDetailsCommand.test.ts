import { Duration } from '@/interactor/entities/Duration'
import { Session } from '@/interactor/entities/Session'
import { ViewSessionRequest } from '@/interactor/requests/SessionRequest'
import { mapSession } from '@/interactor/use-cases/mapper/EntityResponseMapper'
import { ViewSessionDetailsCommand } from '@/interactor/use-cases/ViewSessionDetailsCommand'
import { SessionInMemoryStorage } from './utils/SessionInMemoryStorage'
import { SessionStringOutputPresenter } from './utils/SessionStringOutputPresenter'

describe('[ViewSessionDetails] unit tests', () => {
  describe('when trying to execute View Session Details command', () => {
    it('should should return a session with the same start date', () => {
      const duration = new Duration({
        id: 0,
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

      const dataGateway = new SessionInMemoryStorage([sampleSession])
      const sessionPresenter = new SessionStringOutputPresenter(
        'View Session Details: '
      )
      const viewSessionDetailsCommand = new ViewSessionDetailsCommand(
        dataGateway,
        sessionPresenter
      )

      const request: ViewSessionRequest = {
        start: new Date('2022-04-12T09:00:00'),
        message: 'View session details',
      }

      viewSessionDetailsCommand.execute(request)

      const expectedOutputIncludes = JSON.stringify(mapSession(sampleSession))
      expect(sessionPresenter.output.includes(expectedOutputIncludes)).toBe(
        true
      )
    })
  })
})
