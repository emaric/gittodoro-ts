import { NoteDataGatewayInterface } from '@/interactor/data-gateways/NoteDataGatewayInterface'
import {
  NoteRangeRequest,
  NoteRequest,
} from '@/interactor/requests/NoteRequest'
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
    const response = {
      timestamp: new Date(),
      message: 'Create Note response.',
      note: mapNote(note),
    }
    this.presenter.present(response)
  }
}

class ReadNoteCommand extends BaseNoteCommand {
  execute(request: NoteRequest): void {
    if (request.id != undefined) {
      const note = this.dataGateway.read(request.id)
      const response = {
        timestamp: new Date(),
        message: 'Read Note response.',
        note: mapNote(note),
      }
      this.presenter.present(response)
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
      const response = {
        timestamp: new Date(),
        message: 'Update Note response.',
        note: mapNote(updatedNote),
      }
      this.presenter.present(response)
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

class ReadNoteByRangeCommand extends BaseNoteCommand {
  execute(request: NoteRangeRequest): void {
    const notes = this.dataGateway.readByRange(request.start, request.end)
    const response = {
      timestamp: new Date(),
      message: 'Read Note by range response.',
      notes,
    }
    this.presenter.present(response)
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

export const readNoteByRangeCommand = (
  dataGateway: NoteDataGatewayInterface,
  presenter: NotePresenterInterface
) => {
  return new ReadNoteByRangeCommand(dataGateway, presenter)
}
