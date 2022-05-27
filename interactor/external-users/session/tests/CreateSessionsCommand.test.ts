import { defaultDuration } from '@/interactor/entities/Duration'
import Session from '@/interactor/entities/Session'

import { CreateSessionsGatewayInterface } from '@/interactor/external-users/session/io/data.gateway'
import {
  CreateWithDuration,
  CreateWithDurationID,
} from '@/interactor/external-users/session/io/request.model'

import CreateSessionsCommand from '@/interactor/external-users/session/CreateSessionsCommand'

import SessionInMemory from './utils/SessionInMemory'
import { RequestWith } from '@/interactor/common/io/request.model'

describe('[CreateSessionsCommand] unit tests', () => {
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

  const requestWithDuration: CreateWithDuration = {
    with: RequestWith.duration,
    sessions: [
      {
        ...sessionWithDuration,
        duration: { ...sessionWithDuration.duration, id: undefined },
      },
    ],
  }

  describe('when trying to execute the command with a bad data source', () => {
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
    it('should throw an error for request with duration id', async () => {
      const command = new CreateSessionsCommand(badDB, { present: jest.fn() })

      const request: CreateWithDurationID = {
        with: RequestWith.durationID,
        sessions: [],
      }
      await expect(command.execute(request)).rejects.toThrow(
        'Failed to create sessions.'
      )
    })

    it('should throw an error for request with duration', async () => {
      const command = new CreateSessionsCommand(badDB, { present: jest.fn() })

      const request: CreateWithDuration = {
        with: RequestWith.duration,
        sessions: [],
      }
      await expect(command.execute(request)).rejects.toThrow(
        'Failed to create sessions.'
      )
    })
  })

  describe('when trying to execute with a bad validator', () => {
    it('should throw Not implemented', async () => {
      const db = new SessionInMemory()
      const request: CreateWithDurationID = {
        with: -1,
        sessions: [],
      }
      const command = new CreateSessionsCommand(db, { present: jest.fn() })
      command['validateRequest'] = jest.fn()
      await expect(command.execute(request)).rejects.toThrow(
        'Invalid request type.'
      )
      await expect(command.execute(request)).rejects.toThrow(
        'Failed to create sessions.'
      )
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
      await expect(command.execute(request)).rejects.toThrow('Not implemented.')
      await expect(command.execute(request)).rejects.toThrow(
        'Failed to create sessions.'
      )
    })

    it('should throw Invalid error on RequestWith Duration', async () => {
      const db = new SessionInMemory()
      const request = {
        with: RequestWith.duration,
        sessions: requestWithDurationID.sessions,
      }
      const command = new CreateSessionsCommand(db, { present: jest.fn() })
      await expect(command.execute(request)).rejects.toThrow(
        'Invalid request values.'
      )
      await expect(command.execute(request)).rejects.toThrow(
        'Failed to create sessions.'
      )
    })

    it('should throw Invalid error on RequestWith Duration ID.', async () => {
      const db = new SessionInMemory()
      const request = {
        with: RequestWith.durationID,
        sessions: requestWithDuration.sessions,
      }
      const command = new CreateSessionsCommand(db, { present: jest.fn() })
      await expect(command.execute(request)).rejects.toThrow(
        'Duration ID required.'
      )
      await expect(command.execute(request)).rejects.toThrow(
        'Failed to create sessions.'
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

      await expect(command.execute(requestWithDuration)).resolves.toEqual({
        sessions: [sessionWithDuration],
      })
      expect(presenter).toHaveBeenCalledTimes(1)
    })
  })
})
