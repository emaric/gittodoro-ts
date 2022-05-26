import Note from '@/interactor/entities/Note'
import UpdateNotesCommand from '../UpdateNotesCommand'
import NotesInMemory from './utils/NotesInMemory'

describe('[UpdateNotesCommand] unit tests', () => {
  describe('when trying to execute with a bad data gateway', () => {
    it('should throw', async () => {
      const badDB = {
        update: () => {
          throw new Error('Bad gateway!')
        },
      }
      const command = new UpdateNotesCommand(badDB, { present: jest.fn() })
      await expect(command.execute({ notes: [] })).rejects.toThrow(
        'Bad gateway!'
      )
      await expect(command.execute({ notes: [] })).rejects.toThrow(
        'Failed to update notes.'
      )
    })
  })

  const db = new NotesInMemory()
  db.storage.push(new Note('0', new Date('2022-01-01T00:00:00'), 'Note 0'))
  db.storage.push(new Note('1', new Date('2022-01-01T00:00:00'), 'Note 1'))

  const notes = [
    { id: '0', updatedAt: new Date(), content: 'Note 0 updated.' },
    { id: '1', updatedAt: new Date(), content: 'Note 1 updated.' },
  ]

  let expectedNotes = [...db.storage]
  expectedNotes = expectedNotes.map((n, i) => {
    n.content = notes[i].content
    n.updatedAt = notes[i].updatedAt
    return n
  })

  describe('when trying to execute with valid request', () => {
    it('should present updated notes', async () => {
      const presenter = jest.fn()
      const command = new UpdateNotesCommand(db, { present: presenter })

      const request = {
        notes,
      }

      await expect(command.execute(request)).resolves.toEqual({
        notes: expectedNotes,
      })
      expect(presenter).toHaveBeenCalledTimes(1)
    })
  })

  describe('when tyring to execute with a bad presenter', () => {
    it('should throw bad presenter', async () => {
      const presenter = () => {
        throw new Error('Bad presenter!')
      }
      const command = new UpdateNotesCommand(db, { present: presenter })

      const request = {
        notes,
      }

      const expectedNotes = [...notes]
      expectedNotes[0].id = '0'
      expectedNotes[1].id = '1'

      await expect(command.execute(request)).rejects.toThrow('Bad presenter!')
      await expect(command.execute(request)).rejects.toThrow(
        'Failed to update notes.'
      )
    })
  })
})
