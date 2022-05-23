export default class MultipleErrors extends Error {
  errors: Error[]

  constructor(message?: string, ...errors: Error[]) {
    super(message)
    this.errors = errors
  }
}
