export default class InteractorError extends Error {
  errors: Error[]

  constructor(message?: string, ...errors: Error[]) {
    super(message)
    this.errors = errors
  }
}
