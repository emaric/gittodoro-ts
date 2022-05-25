import Session from '@/interactor/entities/Session'
import { defaultDuration } from '@/interactor/entities/Duration'

import { DeleteSessionsGatewayInterface } from '@/interactor/external-users/session/io/data.gateway'
import {
  DeleteByIDs,
  DeleteByRange,
  RequestBy,
} from '@/interactor/external-users/session/io/request.model'

import DeleteSessionsCommand from '@/interactor/external-users/session/DeleteSessionsCommand'

import SessionInMemory from './utils/SessionInMemory'

describe('[DeleteSessionsCommand] unit tests', () => {
  describe('when trying to execute with an erroneous data gateway', () => {
    const badDB: DeleteSessionsGatewayInterface = {
      deleteByRange: function (
        startInclusive: Date,
        end: Date
      ): Promise<Session[]> {
        throw new Error('Function not implemented.')
      },
      deleteByIDs: function (ids: string[]): Promise<Session[]> {
        throw new Error('Function not implemented.')
      },
    }

    it('should throw on delete by range', async () => {
      const request: DeleteByRange = {
        by: RequestBy.range,
        startInclusive: new Date(),
        end: new Date(),
      }
      const command = new DeleteSessionsCommand(badDB, { present: jest.fn() })
      await expect(command.execute(request)).rejects.toThrow(
        'Failed to delete sessions by range.'
      )
    })

    it('should throw on delete by ids', async () => {
      const request: DeleteByIDs = {
        by: RequestBy.ids,
        ids: ['0'],
      }
      const command = new DeleteSessionsCommand(badDB, { present: jest.fn() })
      await expect(command.execute(request)).rejects.toThrow(
        'Failed to delete sessions by ids.'
      )
    })
  })

  describe('when trying to execute with an invalid request value', () => {
    it('should throw Invalid error', async () => {
      const db = new SessionInMemory()
      const request: DeleteByRange = {
        by: -1,
        startInclusive: new Date(),
        end: new Date(),
      }
      const command = new DeleteSessionsCommand(db, { present: jest.fn() })
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
      const command = new DeleteSessionsCommand(db, presenter)

      const request = {
        by: RequestBy.ids,
        ids: ['-1'],
      }

      await expect(command.execute(request)).rejects.toThrow(
        'Failed sending out response.'
      )
    })
  })

  describe('when trying to delete sessions with a valid data gateway', () => {
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

    beforeEach(() => {
      const dbSessions = []
      dbSessions.push(excludedSessions[0])
      dbSessions.push(includedSessions[0])
      dbSessions.push(includedSessions[1])
      dbSessions.push(excludedSessions[1])

      db.storage.session = dbSessions
    })

    const requestByRange: DeleteByRange = {
      by: RequestBy.range,
      startInclusive: new Date('2022-01-05T00:00:00'),
      end: new Date('2022-01-11T00:00:00'),
    }

    const requestByIDs: DeleteByIDs = {
      by: RequestBy.ids,
      ids: includedSessions.map((s) => s.id),
    }

    it('should present sessions by range', async () => {
      const presenter = jest.fn()
      const command = new DeleteSessionsCommand(db, { present: presenter })

      await expect(command.execute(requestByRange)).resolves.toEqual({
        sessions: includedSessions,
      })
      expect(presenter).toHaveBeenCalledTimes(1)
    })

    it('should present sessions by ids', async () => {
      const presenter = jest.fn()
      const command = new DeleteSessionsCommand(db, { present: presenter })

      await expect(command.execute(requestByIDs)).resolves.toEqual({
        sessions: includedSessions,
      })
      expect(presenter).toHaveBeenCalledTimes(1)
    })
  })
})
