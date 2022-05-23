import app from '@/examples/cli-app/index'
import { DEFAULT_DURATION } from './controller'

jest.useFakeTimers()
jest.spyOn(global, 'setTimeout')
describe('[index] unit tests', () => {
  describe('when trying to start a new session for up to one long break interval', () => {
    const duration = DEFAULT_DURATION
    const consoleLog = jest.fn()
    console.log = consoleLog

    app.run()

    it('should display the first state pomodoro and the remaining time', () => {
      expect(setTimeout).toHaveBeenCalledTimes(1)
      expect(consoleLog.mock.calls.at(-1).at(-1)).toBe(
        'pomodoro : ' + duration.pomodoro / 1000
      )
    })

    it('should display the short state and the remaining time', () => {
      jest.advanceTimersByTime(duration.pomodoro)
      expect(setTimeout).toHaveBeenCalledTimes(26)
      expect(consoleLog.mock.calls.at(-1).at(-1)).toBe(
        'short : ' + duration.short / 1000
      )
    })

    it('should display the long state and the remaining time', () => {
      const timeTillLongState =
        duration.pomodoro * (duration.longInterval - 1) +
        duration.short * (duration.longInterval - 1)

      jest.advanceTimersByTime(timeTillLongState)
      // expect(setTimeout).toHaveBeenCalledTimes(7)
      expect(consoleLog.mock.calls.at(-1).at(-1)).toBe(
        'long : ' + duration.long / 1000
      )
    })

    it('should display that the session has ended when stop is called', async () => {
      jest.advanceTimersByTime(duration.long)
      expect(consoleLog.mock.calls.at(-1).at(-1)).toBe(
        'pomodoro : ' + duration.pomodoro / 1000
      )
      await app.stop()

      expect(consoleLog.mock.calls.at(-1).at(-1)).toBe('Session has ended.')
    })

    it('should output the process', () => {
      const output = consoleLog.mock.calls.join('\n')
      const expected = `This sample gittodoro app is running...
Use case #1: The user can start a session.
Starting a session...
pomodoro : 25
pomodoro : 24
pomodoro : 23
pomodoro : 22
pomodoro : 21
pomodoro : 20
pomodoro : 19
pomodoro : 18
pomodoro : 17
pomodoro : 16
pomodoro : 15
pomodoro : 14
pomodoro : 13
pomodoro : 12
pomodoro : 11
pomodoro : 10
pomodoro : 9
pomodoro : 8
pomodoro : 7
pomodoro : 6
pomodoro : 5
pomodoro : 4
pomodoro : 3
pomodoro : 2
pomodoro : 1
pomodoro : 0
short : 5
short : 4
short : 3
short : 2
short : 1
short : 0
pomodoro : 25
pomodoro : 24
pomodoro : 23
pomodoro : 22
pomodoro : 21
pomodoro : 20
pomodoro : 19
pomodoro : 18
pomodoro : 17
pomodoro : 16
pomodoro : 15
pomodoro : 14
pomodoro : 13
pomodoro : 12
pomodoro : 11
pomodoro : 10
pomodoro : 9
pomodoro : 8
pomodoro : 7
pomodoro : 6
pomodoro : 5
pomodoro : 4
pomodoro : 3
pomodoro : 2
pomodoro : 1
pomodoro : 0
short : 5
short : 4
short : 3
short : 2
short : 1
short : 0
pomodoro : 25
pomodoro : 24
pomodoro : 23
pomodoro : 22
pomodoro : 21
pomodoro : 20
pomodoro : 19
pomodoro : 18
pomodoro : 17
pomodoro : 16
pomodoro : 15
pomodoro : 14
pomodoro : 13
pomodoro : 12
pomodoro : 11
pomodoro : 10
pomodoro : 9
pomodoro : 8
pomodoro : 7
pomodoro : 6
pomodoro : 5
pomodoro : 4
pomodoro : 3
pomodoro : 2
pomodoro : 1
pomodoro : 0
short : 5
short : 4
short : 3
short : 2
short : 1
short : 0
pomodoro : 25
pomodoro : 24
pomodoro : 23
pomodoro : 22
pomodoro : 21
pomodoro : 20
pomodoro : 19
pomodoro : 18
pomodoro : 17
pomodoro : 16
pomodoro : 15
pomodoro : 14
pomodoro : 13
pomodoro : 12
pomodoro : 11
pomodoro : 10
pomodoro : 9
pomodoro : 8
pomodoro : 7
pomodoro : 6
pomodoro : 5
pomodoro : 4
pomodoro : 3
pomodoro : 2
pomodoro : 1
pomodoro : 0
long : 10
long : 9
long : 8
long : 7
long : 6
long : 5
long : 4
long : 3
long : 2
long : 1
long : 0
pomodoro : 25
Use case #2: This user can stop a session.
Stopping a session...
Session has ended.`
      expect(output).toBe(expected)
    })
  })
})
