import { UpdateDefaultDurationRequest } from '../io/request.model'
import UpdateDefaultDurationCommand from '../UpdateDefaultDurationCommand'
import DurationInMemory from './utils/DurationInMemory'

describe('[UpdateDefaultDurationCommand] unit tests', () => {
  const request: UpdateDefaultDurationRequest = {
    pomodoro: 25 * 60 * 1000,
    short: 5 * 60 * 1000,
    long: 10 * 60 * 1000,
    interval: 4,
  }

  describe('when trying to execute a request with an erroneous data gateway', () => {
    it('should throw an Error', async () => {
      const badDB = {
        updateDefaultDuration: () => {
          throw new Error()
        },
      }
      const command = new UpdateDefaultDurationCommand(badDB, {
        present: jest.fn(),
      })
      await expect(command.execute(request)).rejects.toThrow()
    })
  })

  const db = new DurationInMemory()
  describe('when trying to execute a request with invalid values', () => {
    it('should throw an error', async () => {
      const command = new UpdateDefaultDurationCommand(db, {
        present: jest.fn(),
      })
      await expect(
        command.execute({ pomodoro: 0, short: 0, long: 0, interval: 0 })
      ).rejects.toThrow()
    })
  })

  describe('when trying to execute a valid request', () => {
    it('should present the value', async () => {
      const presenter = jest.fn()
      const command = new UpdateDefaultDurationCommand(db, {
        present: presenter,
      })
      await expect(command.execute(request)).resolves.toBeDefined()
      expect(presenter).toBeCalledTimes(1)
    })
  })
})
