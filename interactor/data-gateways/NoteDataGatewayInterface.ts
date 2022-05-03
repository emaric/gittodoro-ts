import { Note } from '@/interactor/entities/Note'

export interface NoteDataGatewayInterface {
  create(note: Note): Promise<Note>

  read(id: number): Promise<Note>

  update(note: Note): Promise<Note>

  delete(id: number): Promise<Note | undefined>

  readByRange(start: Date, end: Date): Promise<Note[]>
}
