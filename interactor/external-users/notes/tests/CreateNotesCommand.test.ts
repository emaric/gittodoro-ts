import Note from '@/interactor/entities/Note'

import CreateNotesCommand from '@/interactor/external-users/notes/CreateNotesCommand'

import NotesInMemory from './utils/NotesInMemory'

describe('[CreateNotesCommand] unit tests', () => {
  describe('when trying to execute with a bad data gateway', () => {
    it('should throw', async () => {
      const badDB = {
        create: () => {
          throw new Error('Bad gateway!')
        },
      }
      const command = new CreateNotesCommand(badDB, { present: jest.fn() })
      await expect(command.execute({ notes: [] })).rejects.toThrow(
        'Bad gateway!'
      )
      await expect(command.execute({ notes: [] })).rejects.toThrow(
        'Failed to create notes.'
      )
    })
  })

  const notes = [
    new Note('-2', new Date(), 'Note 1'),
    new Note('-1', new Date(), 'Note 2', new Date()),
  ]

  describe('when trying to execute with valid request', () => {
    it('should present created notes', async () => {
      const db = new NotesInMemory()
      const presenter = jest.fn()
      const command = new CreateNotesCommand(db, { present: presenter })

      const request = {
        notes,
      }

      const expectedNotes = [...notes]
      expectedNotes[0].id = '0'
      expectedNotes[1].id = '1'

      await expect(command.execute(request)).resolves.toEqual({
        notes: expectedNotes,
      })
      expect(presenter).toHaveBeenCalledTimes(1)
    })
  })

  describe('when tyring to execute with a bad presenter', () => {
    it('should throw bad presenter', async () => {
      const db = new NotesInMemory()
      const presenter = () => {
        throw new Error('Bad presenter!')
      }
      const command = new CreateNotesCommand(db, { present: presenter })

      const request = {
        notes,
      }

      const expectedNotes = [...notes]
      expectedNotes[0].id = '0'
      expectedNotes[1].id = '1'

      await expect(command.execute(request)).rejects.toThrow('Bad presenter!')
      await expect(command.execute(request)).rejects.toThrow(
        'Failed to create notes.'
      )
    })
  })
})
