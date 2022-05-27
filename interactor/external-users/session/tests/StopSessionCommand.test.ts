import StopSessionCommand from '@/interactor/external-users/session/StopSessionCommand'
import StartSessionCommand from '@/interactor/external-users/session/StartSessionCommand'

import SessionInMemory from './utils/SessionInMemory'
import { RequestWith } from '../io/request.model'

describe('[StopSessionCommand] unit tests', () => {
  const db = new SessionInMemory()

  describe('when trying to execute an erroneous request', () => {
    it('should throw', async () => {
      const presenter = jest.fn()
      const badStop = () => {
        throw new Error()
      }
      const command = new StopSessionCommand(
        { stop: badStop },
        { present: presenter }
      )
      await expect(command.execute({ date: new Date() })).rejects.toThrow()
      expect(presenter).toHaveBeenCalledTimes(0)
    })
  })

  describe('when trying to stop a non existent session', () => {
    it('should return an undefined value', async () => {
      const presenter = jest.fn()
      const command = new StopSessionCommand(db, { present: presenter })
      await expect(command.execute({ date: new Date() })).resolves.toEqual({
        session: undefined,
      })
      expect(presenter).toHaveBeenCalledTimes(1)
    })
  })

  describe('when trying to execute a valid request', () => {
    beforeAll(async () => {
      const command = new StartSessionCommand(db, { present: jest.fn() })
      const request = {
        with: RequestWith.durationID,
        start: new Date(),
        duration: { id: '0' },
      }
      await command.execute(request)
    })

    it('should stop the last active session', async () => {
      const presenter = jest.fn()
      const command = new StopSessionCommand(db, { present: presenter })
      await command.execute({ date: new Date() })
      expect(presenter).toHaveBeenCalledTimes(1)
    })
  })
})
