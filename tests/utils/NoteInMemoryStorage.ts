import { NoteDataGatewayInterface } from '@/interactor/data-gateways/NoteDataGatewayInterface'
import { Note } from '@/interactor/entities/Note'

export class NoteInMemoryStorage implements NoteDataGatewayInterface {
  storage: Note[]

  constructor(storage: Note[]) {
    this.storage = storage
  }

  create(note: Note): Promise<Note> {
    const id = this.storage.length
    const newNote: Note = {
      ...note,
      id: id,
    }
    this.storage.push(newNote)
    return this.read(id)
  }

  read(id: number): Promise<Note> {
    const note = this.storage.find((n) => n.id == id)
    if (note) {
      return Promise.resolve(note)
    }
    throw new Error('Not found.')
  }

  update(note: Note): Promise<Note> {
    this.storage = this.storage.map((n) => {
      if (note.id == n.id) {
        return {
          ...note,
        }
      } else {
        return n
      }
    })
    return this.read(note.id)
  }

  delete(id: number): Promise<Note | undefined> {
    this.storage = this.storage.filter((n) => n.id != id)
    if (this.storage.find((n) => n.id == id)) {
      return Promise.reject(new Error('Deletion was unsuccessful'))
    }
    return Promise.resolve(undefined)
  }

  readByRange(start: Date, end: Date) {
    const filtered = this.storage.filter((n: Note) => {
      if (n.date.getTime() >= start.getTime()) {
        return true
      }
      return end.getTime() >= n.date.getTime()
    })
    return Promise.resolve(filtered)
  }
}
