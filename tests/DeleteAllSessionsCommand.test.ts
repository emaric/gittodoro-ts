import {
  DeleteAllRequest,
  SaveAllRequest,
  SessionModelRequest,
} from '@/interactor/requests/SessionRequest'
import { DeleteAllSessionsCommand } from '@/interactor/use-cases/DeleteAllSessionsCommand'
import { mapSessions } from '@/interactor/use-cases/mapper/EntityResponseMapper'
import { SaveAllSessionsCommand } from '@/interactor/use-cases/SaveAllSessionsCommand'
import { SessionInMemoryStorage } from './utils/SessionInMemoryStorage'
import { SessionStringOutputPresenter } from './utils/SessionStringOutputPresenter'

describe('[DeleteAllSessionsCommand] unit tests', () => {
  describe("when trying to delete all sessions with the given list of id's", () => {
    const dataGateway = new SessionInMemoryStorage([])

    beforeAll(async () => {
      const presenter = new SessionStringOutputPresenter(
        'Saving all Sessions: '
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
      await saveAllCommand.execute(request)
    })

    it('should return the deleted sessions', async () => {
      const presenter = new SessionStringOutputPresenter(
        'Deleting multiple Sessions:\n'
      )

      const deleteAllCommand = new DeleteAllSessionsCommand(
        dataGateway,
        presenter
      )

      const request: DeleteAllRequest = {
        timestamp: new Date(),
        message: 'Delete sessions 1, 2, 3.',
        ids: [1, 2, 3],
      }

      const expectedOutputIncludes = JSON.stringify(
        mapSessions(
          dataGateway.storage.filter((s) =>
            request.ids.includes(Number.parseInt(s.id))
          )
        )
      )

      const response = await deleteAllCommand.execute(request)

      expect(presenter.output.includes(expectedOutputIncludes)).toBe(true)
      expect(dataGateway.storage.map((s) => s.id)).toEqual([0, 4])
      expect(response.sessions?.map((s) => s.id)).toEqual([1, 2, 3])
    })
  })
})
