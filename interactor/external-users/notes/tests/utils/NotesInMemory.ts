import Note from '@/interactor/entities/Note'
import {
  CreateNotesGatewayInterface,
  DeleteNotesGatewayInterface,
  ReadNotesGatewayInterface,
  UpdateNotesGatewayInterface,
} from '@/interactor/external-users/notes/io/data.gateway'

export default class NotesInMemory
  implements
    CreateNotesGatewayInterface,
    ReadNotesGatewayInterface,
    UpdateNotesGatewayInterface,
    DeleteNotesGatewayInterface
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

  update(
    notes: { id: string; content: string; updatedAt: Date }[]
  ): Promise<Note[]> {
    const ids = notes.map((n) => n.id)
    const notesToUpdate = this.storage.filter((n) => ids.includes(n.id))
    const updatedNotes = notesToUpdate.map((n) => {
      const values = notes.find((v) => v.id == n.id)
      if (values) {
        n.content = values.content
        n.updatedAt = values.updatedAt
      }
      return n
    })

    this.storage = this.storage.map((note) => {
      const updated = updatedNotes.find((n) => note.id == n.id)
      if (updated) {
        return updated
      }
      return note
    })

    return Promise.resolve(updatedNotes)
  }

  async deleteByRange(startInclusive: Date, end: Date): Promise<Note[]> {
    const notesToDelete = await this.readByRange(startInclusive, end)
    this.storage = this.storage.filter((n) => !notesToDelete.includes(n))
    return Promise.resolve(notesToDelete)
  }

  async deleteByIDs(ids: string[]): Promise<Note[]> {
    const notesToDelete = await this.readByIDs(ids)
    this.storage = this.storage.filter((n) => !notesToDelete.includes(n))
    return Promise.resolve(notesToDelete)
  }
}
