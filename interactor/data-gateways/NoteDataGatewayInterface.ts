import { Note } from '@/interactor/entities/Note'

export interface NoteDataGatewayInterface {
  create(note: Note): Note

  read(id: number): Note

  update(note: Note): Note

  delete(id: number): void

  readByRange(start: Date, end: Date): Note[]
}
