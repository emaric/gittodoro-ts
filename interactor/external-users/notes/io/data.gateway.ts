import Note from '@/interactor/entities/Note'

export interface CreateNotesGatewayInterface {
  create(
    notes: { content: string; date: Date; updatedAt?: Date }[]
  ): Promise<Note[]>
}

export interface ReadNotesGatewayInterface {
  readByRange(startInclusive: Date, end: Date): Promise<Note[]>

  readByIDs(ids: string[]): Promise<Note[]>
}

export interface UpdateNotesGatewayInterface {
  update(
    notes: {
      id: string
      content: string
      updatedAt: Date
    }[]
  ): Promise<Note[]>
}

export interface DeleteNotesGatewayInterface {
  deleteByRange(startInclusive: Date, end: Date): Promise<Note[]>

  deleteByIDs(ids: string[]): Promise<Note[]>
}
