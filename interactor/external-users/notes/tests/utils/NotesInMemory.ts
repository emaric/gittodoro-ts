import Note from '@/interactor/entities/Note'
import { CreateNotesGatewayInterface } from '../../io/data.gateways'

export default class NotesInMemory implements CreateNotesGatewayInterface {
  storage: Note[] = []

  create(
    notes: { content: string; date: Date; updatedAt?: Date | undefined }[]
  ): Promise<Note[]> {
    const newNotes: Note[] = notes.map(
      (n, i) =>
        new Note(
          String(this.storage.length + i),
          n.date,
          n.content,
          n.updatedAt
        )
    )
    this.storage = this.storage.concat(newNotes)
    return Promise.resolve(newNotes)
  }
}
