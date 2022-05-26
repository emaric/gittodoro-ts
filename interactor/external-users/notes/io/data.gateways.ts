import Note from '@/interactor/entities/Note'

export interface CreateNotesGatewayInterface {
  create(
    notes: { content: string; date: Date; updatedAt?: Date }[]
  ): Promise<Note[]>
}
