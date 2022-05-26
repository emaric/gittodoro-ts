import Note from '@/interactor/entities/Note'

import { RequestBy } from '@/interactor/external-users/common/io/request.model'
import { DeleteNotesGatewayInterface } from '@/interactor/external-users/notes/io/data.gateway'
import {
  DeleteByIDs,
  DeleteByRange,
} from '@/interactor/external-users/notes/io/request.model'

import DeleteNotesCommand from '@/interactor/external-users/notes/DeleteNotesCommand'

import NotesInMemory from './utils/NotesInMemory'

describe('[DeleteNotesCommand] unit tests', () => {
  describe('when trying to execute with an erroneous data gateway', () => {
    const badDB: DeleteNotesGatewayInterface = {
      deleteByRange: function (
        startInclusive: Date,
        end: Date
      ): Promise<Note[]> {
        throw new Error('Function not implemented.')
      },
      deleteByIDs: function (ids: string[]): Promise<Note[]> {
        throw new Error('Function not implemented.')
      },
    }

    it('should throw on delete by range', async () => {
      const request: DeleteByRange = {
        by: RequestBy.range,
        startInclusive: new Date(),
        end: new Date(),
      }
      const command = new DeleteNotesCommand(badDB, { present: jest.fn() })
      await expect(command.execute(request)).rejects.toThrow(
        'Failed to delete notes by range.'
      )
    })

    it('should throw on delete by ids', async () => {
      const request: DeleteByIDs = {
        by: RequestBy.ids,
        ids: ['0'],
      }
      const command = new DeleteNotesCommand(badDB, { present: jest.fn() })
      await expect(command.execute(request)).rejects.toThrow(
        'Failed to delete notes by ids.'
      )
    })
  })

  describe('when trying to execute with an invalid request value', () => {
    it('should throw Invalid error', async () => {
      const db = new NotesInMemory()
      const request: DeleteByRange = {
        by: -1,
        startInclusive: new Date(),
        end: new Date(),
      }
      const command = new DeleteNotesCommand(db, { present: jest.fn() })
      await expect(command.execute(request)).rejects.toThrow(
        'Invalid request type.'
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
      const command = new DeleteNotesCommand(db, presenter)

      const request = {
        by: RequestBy.ids,
        ids: ['-1'],
      }

      await expect(command.execute(request)).rejects.toThrow(
        'Failed sending out response.'
      )
    })
  })

  describe('when trying to delete notes with a valid data gateway', () => {
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

    beforeEach(() => {
      db.storage = []
      db.storage.push(excludedNotes[0])
      db.storage.push(includedNotes[0])
      db.storage.push(includedNotes[1])
      db.storage.push(excludedNotes[1])
    })

    const requestByRange: DeleteByRange = {
      by: RequestBy.range,
      startInclusive: new Date('2022-01-05T00:00:00'),
      end: new Date('2022-01-11T00:00:00'),
    }

    const requestByIDs: DeleteByIDs = {
      by: RequestBy.ids,
      ids: includedNotes.map((s) => s.id),
    }
    it('should present notes by range', async () => {
      const presenter = jest.fn()
      const command = new DeleteNotesCommand(db, { present: presenter })

      await expect(command.execute(requestByRange)).resolves.toEqual({
        notes: includedNotes,
      })
      expect(db.storage).toEqual(excludedNotes)
      expect(presenter).toHaveBeenCalledTimes(1)
    })

    it('should present notes by ids', async () => {
      const presenter = jest.fn()
      const command = new DeleteNotesCommand(db, { present: presenter })

      await expect(command.execute(requestByIDs)).resolves.toEqual({
        notes: includedNotes,
      })
      expect(db.storage).toEqual(excludedNotes)
      expect(presenter).toHaveBeenCalledTimes(1)
    })
  })
})
