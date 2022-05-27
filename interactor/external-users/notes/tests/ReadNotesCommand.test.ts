import Note from '@/interactor/entities/Note'
import { RequestBy } from '@/interactor/external-users/common/io/request.model'
import ReadNotesCommand from '@/interactor/external-users/notes/ReadNotesCommand'
import {
  ReadByIDs,
  ReadByRange,
} from '@/interactor/external-users/notes/io/request.model'
import NotesInMemory from './utils/NotesInMemory'

describe('[ReadNotesCommand] unit tests', () => {
  describe('when trying to execute with a bad data gateway', () => {
    const badDB = {
      readByRange: () => {
        throw new Error('Bad read by range!')
      },
      readByIDs: () => {
        throw new Error('Bad read by ids!')
      },
    }

    it('should throw for bad read by range', async () => {
      const command = new ReadNotesCommand(badDB, { present: jest.fn() })
      const request = {
        by: RequestBy.range,
        startInclusive: new Date(),
        end: new Date(),
      }
      await expect(command.execute(request)).rejects.toThrow(
        'Bad read by range!'
      )
      await expect(command.execute(request)).rejects.toThrow(
        'Failed to read notes.'
      )
    })

    it('should throw for bad read by ids', async () => {
      const command = new ReadNotesCommand(badDB, { present: jest.fn() })
      const request = {
        by: RequestBy.ids,
        ids: ['0'],
      }
      await expect(command.execute(request)).rejects.toThrow('Bad read by ids!')
      await expect(command.execute(request)).rejects.toThrow(
        'Failed to read notes.'
      )
    })
  })

  describe('when trying to execute with an invalid request value', () => {
    it('should throw Invalid error', async () => {
      const db = new NotesInMemory()
      const request: ReadByRange = {
        by: -1,
        startInclusive: new Date(),
        end: new Date(),
      }
      const command = new ReadNotesCommand(db, { present: jest.fn() })
      await expect(command.execute(request)).rejects.toThrow(
        'Invalid request type.'
      )
    })

    it('should throw Invalid error', async () => {
      const db = new NotesInMemory()
      const request: ReadByIDs = {
        by: RequestBy.range,
        ids: ['0'],
      }
      const command = new ReadNotesCommand(db, { present: jest.fn() })
      await expect(command.execute(request)).rejects.toThrow(
        'Invalid request values.'
      )
    })

    it('should throw Invalid error', async () => {
      const db = new NotesInMemory()
      const request: ReadByRange = {
        by: RequestBy.ids,
        startInclusive: new Date(),
        end: new Date(),
      }
      const command = new ReadNotesCommand(db, { present: jest.fn() })
      await expect(command.execute(request)).rejects.toThrow(
        'Invalid request values.'
      )
    })

    it('should throw Invalid error', async () => {
      const db = new NotesInMemory()
      const request: ReadByRange = {
        by: RequestBy.range,
        startInclusive: new Date(Date.now() + 10000),
        end: new Date(),
      }
      const command = new ReadNotesCommand(db, { present: jest.fn() })
      await expect(command.execute(request)).rejects.toThrow(
        'Start date is greater than the End date.'
      )
      await expect(command.execute(request)).rejects.toThrow(
        'Invalid request values.'
      )
    })
  })

  describe('when trying to execute with an erroneous presenter', () => {
    it('should throw', async () => {
      const presenter = {
        present: () => {
          throw new Error('Bad presenter!')
        },
      }
      const db = new NotesInMemory()
      const command = new ReadNotesCommand(db, presenter)

      const request = {
        by: RequestBy.ids,
        ids: ['-1'],
      }

      await expect(command.execute(request)).rejects.toThrow(
        'Failed sending out response.'
      )
    })
  })

  describe('when trying to read notes with a valid data gateway', () => {
    const db = new NotesInMemory()

    const excludedNotes = [
      new Note(
        '1',
        new Date('2022-01-04T09:00:00'),
        'Note 1',
        new Date('2022-01-04T13:00:00')
      ),
      new Note(
        '4',
        new Date('2022-01-11T00:00:00'),
        'Note 4',
        new Date('2022-01-11T05:00:00')
      ),
    ]

    const includedNotes = [
      new Note(
        '2',
        new Date('2022-01-04T20:00:00'),
        'Note 2',
        new Date('2022-01-05T00:00:00')
      ),
      new Note('3', new Date('2022-01-05T09:00:00'), 'Note 3'),
    ]

    db.storage.push(excludedNotes[0])
    db.storage.push(includedNotes[0])
    db.storage.push(includedNotes[1])
    db.storage.push(excludedNotes[1])

    const requestByRange: ReadByRange = {
      by: RequestBy.range,
      startInclusive: new Date('2022-01-05T00:00:00'),
      end: new Date('2022-01-11T00:00:00'),
    }

    const requestByIDs: ReadByIDs = {
      by: RequestBy.ids,
      ids: includedNotes.map((s) => s.id),
    }

    it('should present notes by range', async () => {
      const presenter = jest.fn()
      const command = new ReadNotesCommand(db, { present: presenter })

      await expect(command.execute(requestByRange)).resolves.toEqual({
        notes: [...includedNotes],
      })
      expect(presenter).toHaveBeenCalledTimes(1)
    })

    it('should present notes by ids', async () => {
      const presenter = jest.fn()
      const command = new ReadNotesCommand(db, { present: presenter })

      await expect(command.execute(requestByIDs)).resolves.toEqual({
        notes: [...includedNotes],
      })
      expect(presenter).toHaveBeenCalledTimes(1)
    })
  })
})
