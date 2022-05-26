import { defaultDuration } from '@/interactor/entities/Duration'
import Session from '@/interactor/entities/Session'
import ReadFirstSessionCommand from '../ReadFirstSessionCommand'
import SessionInMemory from './utils/SessionInMemory'

describe('[ReadFirstSessionCommand] unit tests', () => {
  describe('when trying to execute with an erroneous data gateway', () => {
    it('should throw', async () => {
      const badDB = {
        first: () => {
          throw new Error('Bad data gateway!')
        },
      }
      const command = new ReadFirstSessionCommand(badDB, { present: jest.fn() })
      await expect(command.execute()).rejects.toThrow('Bad data gateway!')
      await expect(command.execute()).rejects.toThrow(
        'Failed to read the first session.'
      )
    })
  })

  describe('when trying to execute with an empty data source', () => {
    it('should respond with undefined', async () => {
      const db = new SessionInMemory()
      const presenter = jest.fn()
      const command = new ReadFirstSessionCommand(db, { present: presenter })
      await expect(command.execute()).resolves.toEqual({ session: undefined })
      expect(presenter).toHaveBeenCalledTimes(1)
    })
  })

  describe('when trying execute from sample sessions', () => {
    it('should present the first session', async () => {
      const firstSession = new Session(
        '1',
        defaultDuration,
        new Date('2022-01-01T00:00:00')
      )
      const secondSession = new Session(
        '0',
        defaultDuration,
        new Date('2022-02-02T00:00:00')
      )
      const sessions = [secondSession, firstSession]
      const db = new SessionInMemory()
      db.storage.session = sessions

      const presenter = jest.fn()
      const command = new ReadFirstSessionCommand(db, { present: presenter })
      await expect(command.execute()).resolves.toEqual({
        session: firstSession,
      })
      expect(presenter).toHaveBeenCalledTimes(1)
    })
  })

  describe('when trying to execute with a bad presenter', () => {
    it('should throw', async () => {
      const db = new SessionInMemory()
      const presenter = () => {
        throw new Error('Bad presenter!')
      }
      const command = new ReadFirstSessionCommand(db, { present: presenter })
      await expect(command.execute()).rejects.toThrow('Bad presenter!')
      await expect(command.execute()).rejects.toThrow(
        'Failed to read the first session.'
      )
    })
  })
})
