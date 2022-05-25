import Duration from '@/interactor/entities/Duration'
import { ResetDefaultDurationDataGatewayInterface } from '../io/data.gateway'
import ResetDefaultDurationCommand from '../ResetDefaultDurationCommand'
import DurationInMemory from './utils/DurationInMemory'

describe('[ResetDefaultDuration] unit tests', () => {
  describe('when trying to execute with an erroneous data gateway', () => {
    it('should throw', async () => {
      const badDB: ResetDefaultDurationDataGatewayInterface = {
        resetDefaultDuration: function (): Promise<Duration> {
          throw new Error('Function not implemented.')
        },
      }
      const command = new ResetDefaultDurationCommand(badDB, {
        present: jest.fn(),
      })
      await expect(command.execute()).rejects.toThrow()
    })
  })

  describe('when trying to execute a successful request', () => {
    it('should return a duration', async () => {
      const db = new DurationInMemory()
      const presenter = jest.fn()
      const command = new ResetDefaultDurationCommand(db, {
        present: presenter,
      })
      await expect(command.execute()).resolves.toBeDefined()
      expect(presenter).toHaveBeenCalledTimes(1)
    })
  })
})
