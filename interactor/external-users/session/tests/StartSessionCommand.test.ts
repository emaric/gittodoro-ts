import StartSessionCommand from '../StartSessionCommand'
import SessionInMemory from './utils/SessionInMemory'

describe('[StartSessionCommand] unit tests', () => {
  describe('when trying to execute the command with a bad data source', () => {
    it('should throw an error', async () => {
      const badDB = {
        start: () => {
          throw new Error()
        },
      }
      const command = new StartSessionCommand(badDB, { present: jest.fn() })
      await expect(
        command.execute({ start: new Date(), durationId: '' })
      ).rejects.toThrow()
    })
  })

  const db = new SessionInMemory()
  describe('when trying to execute with invalid request values', () => {
    it('should throw if the duration id is invalid', async () => {
      const command = new StartSessionCommand(db, { present: jest.fn() })
      await expect(
        command.execute({ start: new Date(), durationId: '-1' })
      ).rejects.toThrow()
    })
  })

  describe('when trying to execute with valid request values', () => {
    it('should return a session response', async () => {
      const presenter = jest.fn()
      const command = new StartSessionCommand(db, { present: presenter })
      await expect(
        command.execute({ start: new Date(), durationId: '0' })
      ).resolves.toBeDefined()
      expect(presenter).toHaveBeenCalledTimes(1)
    })
  })
})
