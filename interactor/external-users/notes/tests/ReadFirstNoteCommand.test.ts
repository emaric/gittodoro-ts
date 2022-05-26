import Note from '@/interactor/entities/Note'
import ReadFirstNoteCommand from '../ReadFirstNoteCommand'
import NotesInMemory from './utils/NotesInMemory'

describe('[ReadFirstNoteCommand] unit tests', () => {
  describe('when trying to execute with an erroneous data gateway', () => {
    it('should throw', async () => {
      const badDB = {
        first: () => {
          throw new Error('Bad data gateway!')
        },
      }
      const command = new ReadFirstNoteCommand(badDB, { present: jest.fn() })
      await expect(command.execute()).rejects.toThrow('Bad data gateway!')
      await expect(command.execute()).rejects.toThrow(
        'Failed to get the first note.'
      )
    })
  })

  describe('when trying to execute with an empty data source', () => {
    it('should respond with undefined', async () => {
      const db = new NotesInMemory()
      const presenter = jest.fn()
      const command = new ReadFirstNoteCommand(db, { present: presenter })
      await expect(command.execute()).resolves.toEqual({ note: undefined })
      expect(presenter).toHaveBeenCalledTimes(1)
    })
  })

  describe('when trying execute from sample notes', () => {
    it('should present the first note', async () => {
      const firstNote = new Note(
        '1',
        new Date('2022-01-01T00:00:00'),
        'First Note'
      )
      const secondNote = new Note(
        '0',
        new Date('2022-02-02T00:00:00'),
        'Second Note'
      )
      const notes = [secondNote, firstNote]
      const db = new NotesInMemory()
      db.storage = notes

      const presenter = jest.fn()
      const command = new ReadFirstNoteCommand(db, { present: presenter })
      await expect(command.execute()).resolves.toEqual({ note: firstNote })
      expect(presenter).toHaveBeenCalledTimes(1)
    })
  })
})
