import {
  createNoteCommand,
  readNoteCommand,
  updateNoteCommand,
  deleteNoteCommand,
} from '@/interactor/use-cases/CRUDNoteCommandFactory'
import { mapNote } from '@/interactor/use-cases/mapper/EntityResponseMapper'
import { NoteRequest } from '@/interactor/requests/NoteRequest'

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

      const expectedOutput =
        'Note: ' + JSON.stringify(mapNote(dataGateway.storage[0]))

      expect(presenter.output).toBe(expectedOutput)
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

      const expectedOutput =
        'Note: ' + JSON.stringify(mapNote(dataGateway.storage[0]))

      expect(presenter.output).toBe(expectedOutput)
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
      const oldValue =
        'Read command Note: ' + JSON.stringify(mapNote(dataGateway.storage[0]))
      readCommand.execute(request)
      expect(readPresenter.output).toBe(oldValue)

      // assert that the note is updated
      updateCommand.execute(request)
      const newValue =
        'Update command Note: ' +
        JSON.stringify(mapNote(dataGateway.storage[0]))
      expect(newValue.includes('-SHOULD INCLUDE THIS TEXT-')).toBe(true)
      expect(updatePresenter.output).toBe(newValue)
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
  })
})
