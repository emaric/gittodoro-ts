import { CLI } from './view'
import { SessionCLIApp } from './controller'

const cli = new CLI()

const app = new SessionCLIApp(cli)

const run = (): number => {
  console.log('This sample gittodoro app is running...')
  console.log('Use case #1: The user can start a session.')
  app.start()
  return 0
}

const stop = (): number => {
  console.log('Use case #2: This user can stop a session.')
  app.stop()
  return 0
}

export default {
  run,
  stop,
}
