export default class RecordError extends Error {
  errors: Error[]

  constructor(message?: string, errors: Error[] = []) {
    super(message)
    this.errors = errors
  }
}
