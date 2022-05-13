import {
  SaveAllRequest,
  SessionModelRequest,
} from '@/interactor/requests/SessionRequest'
import { mapSessions } from '@/interactor/use-cases/mapper/EntityResponseMapper'
import { SaveAllSessionsCommand } from '@/interactor/use-cases/SaveAllSessionsCommand'
import { SessionInMemoryStorage } from './utils/SessionInMemoryStorage'
import { SessionStringOutputPresenter } from './utils/SessionStringOutputPresenter'

describe('[SaveAllSessionsCommand] unit tests', () => {
  describe('when trying to save all the given list of sessions', () => {
    it('should return the saved sessions', async () => {
      const dataGateway = new SessionInMemoryStorage([])
      const presenter = new SessionStringOutputPresenter(
        'Saving multiple Sessions: '
      )
      const saveAllCommand = new SaveAllSessionsCommand(dataGateway, presenter)

      const duration = {
        pomodoro: 50,
        short: 10,
        long: 20,
        longInterval: 4,
      }

      const sessions: SessionModelRequest[] = [
        {
          start: new Date('2022-05-01T09:00:00'),
          end: new Date('2022-05-01T17:00:00'),
          ...duration,
        },
        {
          start: new Date('2022-05-02T09:00:00'),
          end: new Date('2022-05-02T17:00:00'),
          ...duration,
        },
        {
          start: new Date('2022-05-03T09:00:00'),
          end: new Date('2022-05-03T17:00:00'),
          ...duration,
        },
        {
          start: new Date('2022-05-04T09:00:00'),
          end: new Date('2022-05-04T17:00:00'),
          ...duration,
        },
        {
          start: new Date('2022-05-05T09:00:00'),
          end: new Date('2022-05-05T17:00:00'),
          ...duration,
        },
      ]

      const request: SaveAllRequest = {
        timestamp: new Date(),
        message: 'Save all these sessions.',
        sessions,
      }
      const response = await saveAllCommand.execute(request)

      const expectedOutputIncludes = JSON.stringify(
        mapSessions(dataGateway.storage)
      )

      expect(presenter.output.includes(expectedOutputIncludes)).toBe(true)
      expect(dataGateway.storage.map((s) => s.id)).toEqual(
        response.sessions?.map((s) => s.id)
      )
    })
  })
})
