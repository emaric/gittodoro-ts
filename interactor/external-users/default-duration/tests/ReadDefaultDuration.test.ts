import Duration from '@/interactor/entities/Duration'
import { ReadDefaultDurationDataGatewayInterface } from '../io/data.gateway'
import ReadDefaultDurationCommand from '../ReadDefaultDurationCommand'
import DurationInMemory from './utils/DurationInMemory'

describe('[ReadDefaultDuration] unit tests', () => {
  describe('when trying to execute a request with an erroneous data gateway', () => {
    it('should throw an error', async () => {
      const badDB: ReadDefaultDurationDataGatewayInterface = {
        getDefaultDuration: function (): Promise<Duration> {
          throw new Error('Function not implemented.')
        },
      }
      const command = new ReadDefaultDurationCommand(badDB, {
        present: jest.fn(),
      })
      await expect(command.execute()).rejects.toThrow()
    })
  })

  describe('when trying to execute a request with an invalid default duration', () => {
    it('should throw Invalid duration error', async () => {
      const db = new DurationInMemory()
      const invalidDuration = new Duration('1', 0, 0, 0, 0)
      db.storage.push(invalidDuration)
      db.defaultId = invalidDuration.id
      const command = new ReadDefaultDurationCommand(db, { present: jest.fn() })
      await expect(command.execute()).rejects.toThrow('Invalid duration')
    })
  })

  describe('when trying to execute a request without a default duration set', () => {
    it('should throw Duration not found error', async () => {
      const db = new DurationInMemory()
      db.defaultId = 'NonExistent'
      const command = new ReadDefaultDurationCommand(db, { present: jest.fn() })
      await expect(command.execute()).rejects.toThrow('Duration not found.')
    })
  })

  describe('when trying to execute a request with valid default duration', () => {
    it('should respond with a valid duration', async () => {
      const db = new DurationInMemory()
      const presenter = jest.fn()
      const command = new ReadDefaultDurationCommand(db, { present: presenter })
      await expect(command.execute()).resolves.toBeDefined()
      expect(presenter).toHaveBeenCalledTimes(1)
    })
  })
})
