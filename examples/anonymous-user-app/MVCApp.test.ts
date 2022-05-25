import MVCApp from '@/examples/anonymous-user-app/app/MVCApp'

jest.useFakeTimers()
jest.spyOn(global, 'setTimeout')
describe('[MVCApp] unit tests', () => {
  describe('when trying to start a new session for up to one long break interval', () => {
    function flushPromises() {
      return new Promise(jest.requireActual('timers').setImmediate)
    }

    const consoleLog = jest.fn()
    console.log = consoleLog

    test('should display the first state pomodoro and the remaining time', async () => {
      const app = new MVCApp()
      app.initializeModelDefaultDuration()
      await flushPromises()

      app.start()
      jest.runOnlyPendingTimers()
      await flushPromises()
      jest.runOnlyPendingTimers()
      await flushPromises()
      jest.runOnlyPendingTimers()
      await flushPromises()
      jest.runOnlyPendingTimers()
      await flushPromises()
      jest.runOnlyPendingTimers()
      await flushPromises()
      jest.runOnlyPendingTimers()
      await flushPromises()
      jest.runOnlyPendingTimers()
      await flushPromises()
      jest.runOnlyPendingTimers()
      await flushPromises()

      jest.runOnlyPendingTimers()
      await flushPromises()

      expect(setTimeout).toHaveBeenCalledTimes(9)

      const expected = `
The timer is set to run for 25 minutes for each Pomodoro or 'Focus time!'. Then a short break of 5 minutes. After 4 Pomodoros, the next break will be for 15 minutes.
\nStarting a Session...
🍅 Stay focused on the task for 25 minutes.
🟢 Take a break for 5 minutes.
🍅 Stay focused on the task for 25 minutes.
🟢 Take a break for 5 minutes.
🍅 Stay focused on the task for 25 minutes.
🟢 Take a break for 5 minutes.
🍅 Stay focused on the task for 25 minutes.
🔵 Take a break for 15 minutes.
The Session has stopped.
`
      expect(consoleLog.mock.calls.join('')).toBe(expected)
    })
  })
})
