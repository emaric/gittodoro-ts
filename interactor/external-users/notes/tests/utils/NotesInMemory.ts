import Note from '@/interactor/entities/Note'
import {
  CreateNotesGatewayInterface,
  ReadNotesGatewayInterface,
} from '@/interactor/external-users/notes/io/data.gateways'

export default class NotesInMemory
  implements CreateNotesGatewayInterface, ReadNotesGatewayInterface
{
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

  readByRange(startInclusive: Date, end: Date): Promise<Note[]> {
    const notes = this.storage.filter((n) => {
      const dateWithinRange =
        n.date.getTime() >= startInclusive.getTime() &&
        n.date.getTime() < end.getTime()

      if (dateWithinRange || n.updatedAt == undefined) {
        return dateWithinRange
      }

      const updatedAtWithinRange =
        n.updatedAt.getTime() >= startInclusive.getTime() &&
        n.updatedAt.getTime() < end.getTime()

      return updatedAtWithinRange
    })

    return Promise.resolve(notes)
  }

  readByIDs(ids: string[]): Promise<Note[]> {
    const notes = this.storage.filter((n) => ids.includes(n.id))
    return Promise.resolve(notes)
  }
}
