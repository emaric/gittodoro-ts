import {
  createNoteCommand,
  readNoteCommand,
  updateNoteCommand,
  deleteNoteCommand,
  readNoteByRangeCommand,
} from '@/interactor/use-cases/CRUDNoteCommandFactory'
import { mapNote } from '@/interactor/use-cases/mapper/EntityResponseMapper'
import {
  NoteRequest,
  NoteRangeRequest,
} from '@/interactor/requests/NoteRequest'

import { NoteInMemoryStorage } from '@/tests/utils/NoteInMemoryStorage'
import { NoteStringOutputPresenter } from '@/tests/utils/NoteStringOutputPresenter'

describe('[CRUDNoteCommand] unit tests', () => {
  describe('when trying to execute CRUD command for Notes', () => {
    const dataGateway = new NoteInMemoryStorage([])

    it('should create a note on createNoteCommand', () => {
      const presenter = new NoteStringOutputPresenter('Note: ')
      const createCommand = createNoteCommand(dataGateway, presenter)
      const request: NoteRequest = {
        timestamp: new Date(),
        message: 'create a new note',
        date: new Date(),
        content: 'This is a new note!',
      }
      createCommand.execute(request)

      const expectedNote = JSON.stringify(mapNote(dataGateway.storage[0]))

      expect(presenter.output.includes(expectedNote)).toBe(true)
    })

    it('should return the details of a saved note on readNoteCommand', () => {
      const presenter = new NoteStringOutputPresenter('Note: ')
      const readCommand = readNoteCommand(dataGateway, presenter)
      console.log(dataGateway.storage)
      const request: NoteRequest = {
        timestamp: new Date(),
        message: 'read a note',
        id: 0,
      }
      readCommand.execute(request)

      const expectedNote = JSON.stringify(mapNote(dataGateway.storage[0]))

      expect(presenter.output.includes(expectedNote)).toBe(true)
    })

    it('shoud update the note on updateNoteCommand', () => {
      const readPresenter = new NoteStringOutputPresenter('Read command Note: ')
      const updatePresenter = new NoteStringOutputPresenter(
        'Update command Note: '
      )

      const readCommand = readNoteCommand(dataGateway, readPresenter)
      const updateCommand = updateNoteCommand(dataGateway, updatePresenter)

      const request: NoteRequest = {
        timestamp: new Date(),
        message: 'read a note',
        id: 0,
        content: 'This note has been updated. -SHOULD INCLUDE THIS TEXT-',
      }
      // assert the old values
      const oldValue = JSON.stringify(mapNote(dataGateway.storage[0]))
      readCommand.execute(request)
      expect(readPresenter.output.includes(oldValue)).toBe(true)

      // assert that the note is updated
      updateCommand.execute(request)
      const newValue = JSON.stringify(mapNote(dataGateway.storage[0]))
      expect(newValue.includes('-SHOULD INCLUDE THIS TEXT-')).toBe(true)
      expect(updatePresenter.output.includes(newValue)).toBe(true)
    })

    it('shoud delete the note with the given id', () => {
      const presenter = new NoteStringOutputPresenter('Note presenter: ')
      const deleteCommand = deleteNoteCommand(dataGateway, presenter)

      const request: NoteRequest = {
        timestamp: new Date(),
        message: 'delete a note',
        id: 0,
      }

      // assert that the note exists
      expect(dataGateway.storage[0].id).toBe(request.id)

      // execute the delete command
      deleteCommand.execute(request)
      expect(
        presenter.output.includes('The Note with the id 0 has been deleted.')
      ).toBe(true)

      // assert that the storage is empty
      expect(dataGateway.storage.length).toEqual(0)
    })

    it('should return a list of notes within the given range', () => {
      const presenter = new NoteStringOutputPresenter('Notes presenter: ')
      const readByRangeCommand = readNoteByRangeCommand(dataGateway, presenter)

      const request: NoteRangeRequest = {
        timestamp: new Date(),
        message: 'get notes within range',
        start: new Date('2022-04-02T00:00:00'),
        end: new Date('2022-04-03T00:00:00'),
      }

      const createCommand = createNoteCommand(dataGateway, presenter)
      createCommand.execute({
        timestamp: new Date('2022-04-02T00:09:00'),
        message: 'sample note for range query',
        date: new Date(),
        content: 'This should be included.',
      })
      createCommand.execute({
        timestamp: new Date('2022-04-02T00:10:00'),
        message: 'sample note for range query',
        date: new Date(),
        content: 'This should be included.',
      })
      createCommand.execute({
        timestamp: new Date('2022-04-01T00:10:00'),
        message: 'sample note for range query',
        date: new Date(),
        content: 'This should excluded.',
      })

      expect(dataGateway.storage.length).toEqual(3)

      readByRangeCommand.execute(request)
      expect(dataGateway.storage.length).toEqual(3)
    })
  })
})
