import { NoteDataGatewayInterface } from '@/interactor/data-gateways/NoteDataGatewayInterface'
import { NoteRequest } from '@/interactor/requests/NoteRequest'
import { NoteCommandInterface } from '@/interactor/requests/NoteCommandInterface'
import { NotePresenterInterface } from '@/interactor/responses/NotePresenterInterface'
import { mapNote } from '@/interactor/use-cases/mapper/EntityResponseMapper'

class BaseNoteCommand implements NoteCommandInterface {
  dataGateway: NoteDataGatewayInterface
  presenter: NotePresenterInterface

  constructor(
    dataGateway: NoteDataGatewayInterface,
    presenter: NotePresenterInterface
  ) {
    this.dataGateway = dataGateway
    this.presenter = presenter
  }

  execute(request: NoteRequest): void {
    throw new Error('Method not implemented. ' + request)
  }
}

class CreateNoteCommand extends BaseNoteCommand {
  execute(request: NoteRequest): void {
    const note = this.dataGateway.create({
      id: -1,
      date: request.date || new Date(),
      content: request.content || '',
    })
    this.presenter.present(mapNote(note))
  }
}

class ReadNoteCommand extends BaseNoteCommand {
  execute(request: NoteRequest): void {
    if (request.id != undefined) {
      const note = this.dataGateway.read(request.id)
      this.presenter.present(mapNote(note))
    } else {
      throw new Error('ReadNoteCommand requires id.')
    }
  }
}

class UpdateNoteCommand extends BaseNoteCommand {
  execute(request: NoteRequest): void {
    if (request.id == undefined) {
      throw new Error('UpdateNoteCommand requires id')
    } else {
      const note = this.dataGateway.read(request.id)
      note.content = request.content || ''
      note.updatedAt = request.timestamp
      const updatedNote = this.dataGateway.update(note)
      this.presenter.present(mapNote(updatedNote))
    }
  }
}

class DeleteNoteCommand extends BaseNoteCommand {
  execute(request: NoteRequest): void {
    if (request.id == undefined) {
      throw new Error('DeleteNoteCommand requries id')
    } else {
      try {
        this.dataGateway.delete(request.id)
        this.presenter.present({
          timestamp: new Date(),
          message: `The Note with the id ${request.id} has been deleted.`,
        })
      } catch (e) {
        throw new Error('Delete command failed.')
      }
    }
  }
}

export const createNoteCommand = (
  dataGateway: NoteDataGatewayInterface,
  presenter: NotePresenterInterface
) => {
  return new CreateNoteCommand(dataGateway, presenter)
}

export const readNoteCommand = (
  dataGateway: NoteDataGatewayInterface,
  presenter: NotePresenterInterface
) => {
  return new ReadNoteCommand(dataGateway, presenter)
}

export const updateNoteCommand = (
  dataGateway: NoteDataGatewayInterface,
  presenter: NotePresenterInterface
) => {
  return new UpdateNoteCommand(dataGateway, presenter)
}

export const deleteNoteCommand = (
  dataGateway: NoteDataGatewayInterface,
  presenter: NotePresenterInterface
) => {
  return new DeleteNoteCommand(dataGateway, presenter)
}
