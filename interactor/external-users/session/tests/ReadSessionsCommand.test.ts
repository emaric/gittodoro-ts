import { defaultDuration } from '@/interactor/entities/Duration'
import Session from '@/interactor/entities/Session'
import { ReadSessionsGatewayInterface } from '../io/data.gateway'
import { ReadByIDs, ReadByRange, RequestBy } from '../io/request.model'
import ReadSessionsCommand from '../ReadSessionsCommand'
import SessionInMemory from './utils/SessionInMemory'

describe('[ReadSessionsCommand] unit tests', () => {
  describe('when trying to execute with an erroneous data gateway', () => {
    const badDB: ReadSessionsGatewayInterface = {
      readByRange: function (
        startInclusive: Date,
        end: Date
      ): Promise<Session[]> {
        throw new Error('Function not implemented.')
      },
      readByIDs: function (ids: string[]): Promise<Session[]> {
        throw new Error('Function not implemented.')
      },
    }

    it('should throw on read by range', async () => {
      const request: ReadByRange = {
        by: RequestBy.range,
        startInclusive: new Date(),
        end: new Date(),
      }
      const command = new ReadSessionsCommand(badDB, { present: jest.fn() })
      await expect(command.execute(request)).rejects.toThrow(
        'Failed to read sessions by range.'
      )
    })

    it('should throw on read by ids', async () => {
      const request: ReadByIDs = {
        by: RequestBy.ids,
        ids: ['0'],
      }
      const command = new ReadSessionsCommand(badDB, { present: jest.fn() })
      await expect(command.execute(request)).rejects.toThrow(
        'Failed to read sessions by ids.'
      )
    })
  })

  describe('when trying to execute with an invalid request value', () => {
    it('should throw Invalid error', async () => {
      const db = new SessionInMemory()
      const request: ReadByRange = {
        by: -1,
        startInclusive: new Date(),
        end: new Date(),
      }
      const command = new ReadSessionsCommand(db, { present: jest.fn() })
      await expect(command.execute(request)).rejects.toThrow(
        'Invalid request type.'
      )
    })
  })

  describe('when trying to execute with an erroneous presenter', () => {
    it('should throw', async () => {
      const presenter = {
        present: () => {
          throw new Error('Bad presenter!')
        },
      }
      const db = new SessionInMemory()
      const command = new ReadSessionsCommand(db, presenter)

      const request = {
        by: RequestBy.ids,
        ids: ['-1'],
      }

      await expect(command.execute(request)).rejects.toThrow(
        'Failed sending out response.'
      )
    })
  })

  describe('when trying to read sessions with a valid data gateway', () => {
    const db = new SessionInMemory()

    const excludedSessions = [
      new Session(
        '1',
        defaultDuration,
        new Date('2022-01-04T09:00:00'),
        new Date('2022-01-04T13:00:00')
      ),
      new Session(
        '4',
        defaultDuration,
        new Date('2022-01-11T00:00:00'),
        new Date('2022-01-11T05:00:00')
      ),
    ]

    const includedSessions = [
      new Session(
        '2',
        defaultDuration,
        new Date('2022-01-04T20:00:00'),
        new Date('2022-01-05T00:00:00')
      ),
      new Session('3', defaultDuration, new Date('2022-01-05T09:00:00')),
    ]

    db.storage.session.push(excludedSessions[0])
    db.storage.session.push(includedSessions[0])
    db.storage.session.push(includedSessions[1])
    db.storage.session.push(excludedSessions[1])

    const requestByRange: ReadByRange = {
      by: RequestBy.range,
      startInclusive: new Date('2022-01-05T00:00:00'),
      end: new Date('2022-01-11T00:00:00'),
    }

    const requestByIDs: ReadByIDs = {
      by: RequestBy.ids,
      ids: includedSessions.map((s) => s.id),
    }

    it('should present sessions by range', async () => {
      const presenter = jest.fn()
      const command = new ReadSessionsCommand(db, { present: presenter })

      await expect(command.execute(requestByRange)).resolves.toEqual({
        sessions: includedSessions,
      })
      expect(presenter).toHaveBeenCalledTimes(1)
    })

    it('should present sessions by ids', async () => {
      const presenter = jest.fn()
      const command = new ReadSessionsCommand(db, { present: presenter })

      await expect(command.execute(requestByIDs)).resolves.toEqual({
        sessions: includedSessions,
      })
      expect(presenter).toHaveBeenCalledTimes(1)
    })
  })
})
