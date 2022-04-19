import { NoteCommandInterface } from '@/interactor/requests/NoteCommandInterface'
import {
  NoteRangeRequest,
  NoteRequest,
} from '@/interactor/requests/NoteRequest'

export class NoteController {
  createNote(interactor: NoteCommandInterface, request: NoteRequest) {
    interactor.execute(request)
  }

  readNote(interactor: NoteCommandInterface, request: NoteRequest) {
    interactor.execute(request)
  }

  updateNote(interactor: NoteCommandInterface, request: NoteRequest) {
    interactor.execute(request)
  }

  deleteNote(interactor: NoteCommandInterface, request: NoteRequest) {
    interactor.execute(request)
  }

  readNoteByRange(interactor: NoteCommandInterface, request: NoteRangeRequest) {
    interactor.execute(request)
  }
}
