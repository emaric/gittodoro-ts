import { defaultDuration } from '@/interactor/entities/Duration'
import Session from '@/interactor/entities/Session'
import { RequestWith } from '../io/request.model'
import StartSessionCommand from '../StartSessionCommand'
import SessionInMemory from './utils/SessionInMemory'

describe('[StartSessionCommand] unit tests', () => {
  describe('when trying to execute the command with a bad data source', () => {
    const badDB = {
      startWithDuration: () => {
        throw new Error('Bad db with duration.')
      },
      startWithDurationID: () => {
        throw new Error('Bad db with duration id.')
      },
    }

    it('should throw an error for request with duration', async () => {
      const command = new StartSessionCommand(badDB, { present: jest.fn() })
      const request = {
        with: RequestWith.duration,
        start: new Date(),
        duration: {
          pomodoro: 0,
          short: 0,
          long: 0,
          interval: 0,
        },
      }
      await expect(command.execute(request)).rejects.toThrow(
        'Bad db with duration.'
      )
    })

    it('should throw an error for request with duration id', async () => {
      const command = new StartSessionCommand(badDB, { present: jest.fn() })
      const request = {
        with: RequestWith.durationID,
        start: new Date(),
        duration: {
          id: '0',
        },
      }
      await expect(command.execute(request)).rejects.toThrow(
        'Bad db with duration id.'
      )
    })
  })

  const db = new SessionInMemory()
  describe('when trying to execute with invalid request values', () => {
    it('should throw if the with value is invalid', async () => {
      const command = new StartSessionCommand(db, { present: jest.fn() })
      const request = {
        with: -1,
        start: new Date(),
        duration: {
          id: '0',
        },
      }
      await expect(command.execute(request)).rejects.toThrow('Not implemented.')
      await expect(command.execute(request)).rejects.toThrow(
        'Failed to start a session.'
      )
    })

    it('should throw if the duration object is invalid', async () => {
      const command = new StartSessionCommand(db, { present: jest.fn() })
      const request = {
        with: RequestWith.duration,
        start: new Date(),
        duration: {
          id: '0',
        },
      }
      await expect(command.execute(request)).rejects.toThrow(
        'Invalid request values.'
      )
      await expect(command.execute(request)).rejects.toThrow(
        'Failed to start a session.'
      )
    })

    it('should throw if the duration object is invalid', async () => {
      const command = new StartSessionCommand(db, { present: jest.fn() })
      const request = {
        with: RequestWith.durationID,
        start: new Date(),
        duration: {
          pomodoro: 0,
          short: 0,
          long: 0,
          interval: 0,
        },
      }
      await expect(command.execute(request)).rejects.toThrow(
        'Duration ID required'
      )
      await expect(command.execute(request)).rejects.toThrow(
        'Failed to start a session.'
      )
    })

    it('should throw if the duration id is invalid', async () => {
      const command = new StartSessionCommand(db, { present: jest.fn() })
      const request = {
        with: RequestWith.durationID,
        start: new Date(),
        duration: {
          id: '-1',
        },
      }
      await expect(command.execute(request)).rejects.toThrow(
        'Invalid duration id: -1.'
      )
      await expect(command.execute(request)).rejects.toThrow(
        'Failed to start a session.'
      )
    })
  })

  describe('when trying to execute with a bad validator', () => {
    it('should throw', async () => {
      const command = new StartSessionCommand(db, { present: jest.fn() })
      command['validateRequest'] = () => Promise.resolve(true)
      const request = {
        with: -1,
        start: new Date(),
        duration: defaultDuration,
      }
      await expect(command.execute(request)).rejects.toThrow('Not implemented.')
      await expect(command.execute(request)).rejects.toThrow(
        'Failed to start a session.'
      )
    })
  })

  describe('when trying to execute with valid request values', () => {
    it('should return a session response for request with duration', async () => {
      const presenter = jest.fn()
      const command = new StartSessionCommand(db, { present: presenter })
      const request = {
        with: RequestWith.duration,
        start: new Date(),
        duration: {
          pomodoro: defaultDuration.pomodoro,
          short: defaultDuration.short,
          long: defaultDuration.long,
          interval: defaultDuration.interval,
        },
      }
      await expect(command.execute(request)).resolves.toEqual({
        session: new Session('0', defaultDuration, request.start),
      })
      expect(presenter).toHaveBeenCalledTimes(1)
    })

    it('should return a session response for request with duration id', async () => {
      const presenter = jest.fn()
      const command = new StartSessionCommand(db, { present: presenter })
      const request = {
        with: RequestWith.durationID,
        start: new Date(),
        duration: {
          id: '0',
        },
      }
      await expect(command.execute(request)).resolves.toEqual({
        session: new Session('1', defaultDuration, request.start),
      })
      expect(presenter).toHaveBeenCalledTimes(1)
    })
  })

  describe('when trying to execute with bad presenter', () => {
    it('should throw', async () => {
      const badPresenter = {
        present: () => {
          throw new Error('Bad presenter!')
        },
      }
      const command = new StartSessionCommand(db, badPresenter)
      const request = {
        with: RequestWith.durationID,
        start: new Date(),
        duration: {
          id: '0',
        },
      }
      await expect(command.execute(request)).rejects.toThrow('Bad presenter!')
      await expect(command.execute(request)).rejects.toThrow(
        'Failed to start a session.'
      )
    })
  })
})
