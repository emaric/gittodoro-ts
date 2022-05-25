import MVCApp from './app/MVCApp'

console.log(
  'This is a simple timer for a complete cycle of Pomodoro Session.\n'
)

const app = new MVCApp()

const run = async () => {
  await app.initializeModelDefaultDuration()
  await app.start()
  return 0
}

app.startFastSession()

export default {
  run,
}
