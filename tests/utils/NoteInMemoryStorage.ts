import { NoteDataGatewayInterface } from '@/interactor/data-gateways/NoteDataGatewayInterface'
import { Note } from '@/interactor/entities/Note'

export class NoteInMemoryStorage implements NoteDataGatewayInterface {
  storage: Note[]

  constructor(storage: Note[]) {
    this.storage = storage
  }

  create(note: Note): Note {
    const id = this.storage.length
    const newNote: Note = {
      ...note,
      id: id,
    }
    this.storage.push(newNote)
    return this.read(id)
  }

  read(id: number): Note {
    const note = this.storage.find((n) => n.id == id)
    if (note) {
      return note
    }
    throw new Error('Not found.')
  }

  update(note: Note): Note {
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

  delete(id: number): void {
    this.storage = this.storage.filter((n) => n.id != id)
    if (this.storage.find((n) => n.id == id)) {
      throw new Error('Deletion was unsuccessful.')
    }
  }
}
