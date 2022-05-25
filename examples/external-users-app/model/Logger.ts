export interface LoggerInterface {
  log(log: string): void
  info(log: string): void
  debug(log: string): void
  error(log: string): void
}

export default class Logger implements LoggerInterface {
  private dateTag() {
    return new Date().toJSON() + ' '
  }

  private prefixTag(type: string) {
    return this.dateTag() + `[${type}] `
  }

  log(log: string, ...optionalParams: unknown[]) {
    console.log(this.prefixTag('log') + log, ...optionalParams)
  }

  info(log: string, ...optionalParams: unknown[]) {
    console.info(this.prefixTag('info') + log, ...optionalParams)
  }

  debug(log: string, ...optionalParams: unknown[]) {
    console.debug(this.prefixTag('debug') + log, ...optionalParams)
  }

  error(log: string, ...optionalParams: unknown[]) {
    console.error(this.prefixTag('error') + log, ...optionalParams)
  }
}
