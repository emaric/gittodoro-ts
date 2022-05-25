import { defaultDuration } from '@/interactor/entities/Duration'
import Session from '@/interactor/entities/Session'
import { CreateSessionsGatewayInterface } from '../io/data.gateway'
import {
  CreateWithDuration,
  CreateWithDurationID,
  RequestWith,
} from '../io/request.model'
import CreateSessionsCommand from '../CreateSessionsCommand'
import SessionInMemory from './utils/SessionInMemory'

describe('[CreateSessionsCommand] unit tests', () => {
  describe('when trying to execute the command with a bad data source', () => {
    it('should throw an error', async () => {
      const badDB: CreateSessionsGatewayInterface = {
        createWithDurationID: function (
          sessions: {
            durationId: string
            start: Date
            end?: Date | undefined
          }[]
        ): Promise<Session[]> {
          throw new Error('Function not implemented.')
        },
        createWithDuration: function (
          sessions: {
            pomodoro: number
            short: number
            long: number
            interval: number
            start: Date
            end?: Date | undefined
          }[]
        ): Promise<Session[]> {
          throw new Error('Function not implemented.')
        },
      }
      const command = new CreateSessionsCommand(badDB, { present: jest.fn() })

      const request: CreateWithDurationID = {
        with: RequestWith.durationID,
        sessions: [],
      }
      await expect(command.execute(request)).rejects.toThrow()
    })
  })

  describe('when trying to execute with an invalid request value', () => {
    it('should throw Invalid error on invalid RequestWith value', async () => {
      const db = new SessionInMemory()
      const request: CreateWithDurationID = {
        with: -1,
        sessions: [],
      }
      const command = new CreateSessionsCommand(db, { present: jest.fn() })
      await expect(command.execute(request)).rejects.toThrow(
        'Invalid request type.'
      )
    })

    it('should throw Invalid error on RequestWith Duration', async () => {
      const db = new SessionInMemory()
      const request: CreateWithDuration = {
        with: RequestWith.durationID,
        sessions: [],
      }
      const command = new CreateSessionsCommand(db, { present: jest.fn() })
      await expect(command.execute(request)).rejects.toThrow(
        'Invalid request values.'
      )
    })

    it('should throw Invalid error on RequestWith Duration ID.', async () => {
      const db = new SessionInMemory()
      const request: CreateWithDurationID = {
        with: RequestWith.duration,
        sessions: [],
      }
      const command = new CreateSessionsCommand(db, { present: jest.fn() })
      await expect(command.execute(request)).rejects.toThrow(
        'Invalid request values.'
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
      const command = new CreateSessionsCommand(db, presenter)

      const request = {
        with: RequestWith.durationID,
        sessions: [],
      }

      await expect(command.execute(request)).rejects.toThrow(
        'Failed sending out response.'
      )
    })
  })

  describe('when trying to read sessions with a valid data gateway', () => {
    const sessionWithDurationId = new Session(
      '0',
      defaultDuration,
      new Date('2022-01-04T20:00:00'),
      new Date('2022-01-05T00:00:00')
    )
    const sessionWithDuration = new Session(
      '0',
      defaultDuration,
      new Date('2022-01-05T09:00:00')
    )

    const requestWithDurationID: CreateWithDurationID = {
      with: RequestWith.durationID,
      sessions: [
        { ...sessionWithDurationId, duration: { id: defaultDuration.id } },
      ],
    }

    const requestDuration: CreateWithDuration = {
      with: RequestWith.duration,
      sessions: [
        {
          ...sessionWithDuration,
          duration: { ...sessionWithDuration.duration },
        },
      ],
    }

    it('should present sessions with Duration ID', async () => {
      const db = new SessionInMemory()
      const presenter = jest.fn()
      const command = new CreateSessionsCommand(db, { present: presenter })

      await expect(command.execute(requestWithDurationID)).resolves.toEqual({
        sessions: [sessionWithDurationId],
      })
      expect(presenter).toHaveBeenCalledTimes(1)
    })

    it('should present sessions with Duration', async () => {
      const db = new SessionInMemory()
      const presenter = jest.fn()
      const command = new CreateSessionsCommand(db, { present: presenter })

      await expect(command.execute(requestDuration)).resolves.toEqual({
        sessions: [sessionWithDuration],
      })
      expect(presenter).toHaveBeenCalledTimes(1)
    })
  })
})
