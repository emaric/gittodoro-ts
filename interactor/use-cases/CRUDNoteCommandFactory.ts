import { NoteDataGatewayInterface } from '@/interactor/data-gateways/NoteDataGatewayInterface'
import {
  NoteRangeRequest,
  NoteRequest,
} from '@/interactor/requests/NoteRequest'
import { NoteCommandInterface } from '@/interactor/requests/NoteCommandInterface'
import { NotePresenterInterface } from '@/interactor/responses/NotePresenterInterface'
import { mapNote } from '@/interactor/use-cases/mapper/EntityResponseMapper'
import { NoteBaseResponse } from '../responses/NoteResponse'

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  execute(request: NoteRequest): Promise<NoteBaseResponse> {
    throw new Error('Method not implemented.')
  }
}

class CreateNoteCommand extends BaseNoteCommand {
  async execute(request: NoteRequest): Promise<NoteBaseResponse> {
    const note = await this.dataGateway.create({
      id: -1,
      date: request.date || new Date(),
      content: request.content || '',
    })
    const response: NoteBaseResponse = {
      timestamp: new Date(),
      message: 'Create Note response.',
      note: mapNote(note),
    }
    return new Promise((resolve) => {
      this.presenter.present(response)
      resolve(response)
    })
  }
}

class ReadNoteCommand extends BaseNoteCommand {
  async execute(request: NoteRequest): Promise<NoteBaseResponse> {
    if (request.id != undefined) {
      const note = await this.dataGateway.read(request.id)
      const response = {
        timestamp: new Date(),
        message: 'Read Note response.',
        note: mapNote(note),
      }
      return new Promise((resolve) => {
        this.presenter.present(response)
        resolve(response)
      })
    } else {
      return Promise.reject(new Error('ReadNoteCommand requires id.'))
    }
  }
}

class UpdateNoteCommand extends BaseNoteCommand {
  async execute(request: NoteRequest): Promise<NoteBaseResponse> {
    if (request.id == undefined) {
      throw new Error('UpdateNoteCommand requires id')
    } else {
      const note = await this.dataGateway.read(request.id)
      note.content = request.content || ''
      note.updatedAt = request.updatedAt
      const updatedNote = await this.dataGateway.update(note)
      const response = {
        timestamp: new Date(),
        message: 'Update Note response.',
        note: mapNote(updatedNote),
      }
      return new Promise((resolve) => {
        this.presenter.present(response)
        resolve(response)
      })
    }
  }
}

class DeleteNoteCommand extends BaseNoteCommand {
  async execute(request: NoteRequest): Promise<NoteBaseResponse> {
    if (request.id == undefined) {
      throw new Error('DeleteNoteCommand requries id')
    } else {
      try {
        await this.dataGateway.delete(request.id)
        return new Promise((resolve) => {
          const response = {
            timestamp: new Date(),
            message: `The Note with the id ${request.id} has been deleted.`,
          }
          this.presenter.present(response)
          resolve(response)
        })
      } catch (e) {
        return Promise.reject(new Error('Delete command failed.'))
      }
    }
  }
}

class ReadNoteByRangeCommand extends BaseNoteCommand {
  async execute(request: NoteRangeRequest): Promise<NoteBaseResponse> {
    const notes = await this.dataGateway.readByRange(request.start, request.end)
    const response: NoteBaseResponse = {
      timestamp: new Date(),
      message: 'Read Note by range response.',
      notes,
    }
    return new Promise((resolve) => {
      this.presenter.present(response)
      resolve(response)
    })
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
