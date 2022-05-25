import StartSessionPresenter from '@/examples/external-users-app/model/presenter/StartSessionPresenter'
import StopSessionPresenter from '@/examples/external-users-app/model/presenter/StopSessionPresenter'
import StopSessionCommand from '@/interactor/external-users/session/StopSessionCommand'
import StartSessionCommand from '@/interactor/external-users/session/StartSessionCommand'

import SessionInMemory from './utils/SessionInMemory'

describe('[StopSessionCommand] unit tests', () => {
  const db = new SessionInMemory()

  describe('when trying to execute an erroneous request', () => {
    it('should throw', async () => {
      const viewRenderer = jest.fn()
      const presenter = new StopSessionPresenter({ render: viewRenderer })

      const badStop = () => {
        throw new Error()
      }
      const command = new StopSessionCommand({ stop: badStop }, presenter)
      await expect(command.execute({ date: new Date() })).rejects.toThrow()
      expect(viewRenderer).toHaveBeenCalledTimes(0)
    })
  })

  describe('when trying to stop a non existent session', () => {
    it('should return an undefined value', async () => {
      const viewRenderer = jest.fn()
      const presenter = new StopSessionPresenter({ render: viewRenderer })
      const command = new StopSessionCommand(db, presenter)
      await expect(command.execute({ date: new Date() })).resolves.toEqual({
        session: undefined,
      })
      expect(viewRenderer).toHaveBeenCalledTimes(0)
    })
  })

  describe('when trying to execute a valid request', () => {
    beforeAll(async () => {
      const presenter = new StartSessionPresenter({ render: jest.fn() })
      const command = new StartSessionCommand(db, presenter)
      await command.execute({
        start: new Date(),
        durationId: '0',
      })
    })

    it('should stop the last active session', async () => {
      const viewRenderer = jest.fn()
      const presenter = new StopSessionPresenter({ render: viewRenderer })
      const command = new StopSessionCommand(db, presenter)
      await command.execute({ date: new Date() })
      expect(viewRenderer).toHaveBeenCalledTimes(1)
    })
  })
})
