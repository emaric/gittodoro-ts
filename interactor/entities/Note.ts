export default class Note {
  id: number
  date: Date
  content: string
  updatedAt?: Date

  constructor(id: number, date: Date, content: string, updatedAt?: Date) {
    this.id = id
    this.date = date
    this.content = content
    this.updatedAt = updatedAt
  }
}
