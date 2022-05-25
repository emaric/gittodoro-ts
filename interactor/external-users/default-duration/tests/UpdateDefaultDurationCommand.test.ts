import { UpdateDefaultDurationRequest } from '../io/request.model'
import UpdateDefaultDurationCommand from '../UpdateDefaultDurationCommand'
import DurationInMemory from './utils/DurationInMemory'

describe('[UpdateDefaultDurationCommand] unit tests', () => {
  const request: UpdateDefaultDurationRequest = {
    pomodoro: 25,
    short: 5,
    long: 10,
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
      const presenter = jest.fn()
      const command = new UpdateDefaultDurationCommand(db, {
        present: presenter,
      })
      await expect(
        command.execute({ pomodoro: 0, short: 0, long: 0, interval: 0 })
      ).rejects.toThrow()
    })
  })
})
