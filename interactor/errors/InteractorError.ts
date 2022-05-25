export default class InteractorError extends Error {
  errors: Error[]

  constructor(message?: string, ...errors: Error[]) {
    super(`${message}  \n\n${errors.map((e) => e.message).join('\n')}`)
    this.errors = errors
  }
}
