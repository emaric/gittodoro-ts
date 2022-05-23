import { State } from '@/interactor/entities/State'
import Duration from '@/interactor/entities/Duration'
import RecordBuilder from '@/interactor/record-timer-system/components/RecordBuilder'

describe('[RecordBuilder] unit tests', () => {
  const duration = new Duration('0', 25, 5, 15, 4)
  const builder = new RecordBuilder(duration)

  describe('when trying to calculate the nth record by the elapsed time', () => {
    it(`should return 1 if elapsed time is less than duration.pomodoro (25minutes)`, () => {
      const actual = builder['calculateNRecords'](0)
      expect(actual).toBe(1)
    })

    it(`should return 2 if elapsed time is equal to duration.pomodoro (25minutes)`, () => {
      const actual = builder['calculateNRecords'](duration.pomodoro)
      expect(actual).toBe(2)
    })

    it('should return 3 if elapsed time is within Duration.pomodoro + Duration.short', () => {
      const actual = builder['calculateNRecords'](
        duration.pomodoro + duration.short
      )
      expect(actual).toBe(3)
    })

    it('should return 4 if elapsed time is within Duration.pomodoro + Duration.short + Duration.pomodoro', () => {
      const actual = builder['calculateNRecords'](
        duration.pomodoro + duration.short + duration.pomodoro
      )
      expect(actual).toBe(4)
    })

    it(`should return 9 if elapsed time is equal to 1 cycle + 1`, () => {
      const oneCycle = duration.totalTime
      const actual = builder['calculateNRecords'](oneCycle + 1)
      expect(actual).toBe(9)
    })

    it(`should return 9 if elapsed time is equal to 1 cycle`, () => {
      const oneCycle = duration.totalTime
      const actual = builder['calculateNRecords'](oneCycle)
      expect(actual).toBe(9)
    })

    it(`should return 8 if elapsed time is equal to 1 cycle - duration.long`, () => {
      const oneCycle = duration.totalTime
      const actual = builder['calculateNRecords'](oneCycle - duration.long)
      expect(actual).toBe(8)
    })

    it(`should return 7 if elapsed time is equal to 1 cycle - duration.long - duration.pomodoro`, () => {
      const oneCycle = duration.totalTime
      const actual = builder['calculateNRecords'](
        oneCycle - duration.long - duration.pomodoro
      )
      expect(actual).toBe(7)
    })
  })

  describe('when trying to calculate the state based on the number of records', () => {
    it('should throw an Error if the nth record is less than 1', () => {
      expect(() => builder['calculateState'](0)).toThrow()
    })

    it('should return pomodoro for the first record', () => {
      const actual = builder['calculateState'](1)
      expect(actual).toBe(State.pomodoro)
    })

    it('should return short for the second record', () => {
      const actual = builder['calculateState'](2)
      expect(actual).toBe(State.short)
    })

    it('should return long for the final record of the first cycle', () => {
      const actual = builder['calculateState'](duration.longInterval * 2)
      expect(actual).toBe(State.long)
    })

    it('should return the sequence for 4 longIntervals', () => {
      const actual = Array.from(Array(8)).map((_, i) =>
        builder['calculateState'](i + 1)
      )
      const expected = [
        State.pomodoro,
        State.short,
        State.pomodoro,
        State.short,
        State.pomodoro,
        State.short,
        State.pomodoro,
        State.long,
      ]

      expect(actual).toEqual(expected)
    })
  })

  describe('when trying to create record based on estimated end date', () => {
    it('should throw and error if the estimated end date is less than the start date', () => {
      const start = new Date('2022-01-01T09:00:00')
      const end = new Date(start.getTime() - 1)
      expect(() => builder.createRecord(start, end)).toThrow()
    })

    it('should return a pomodoro record', () => {
      const start = new Date('2022-01-01T09:00:00')
      const end = start
      const actual = builder.createRecord(start, end)
      expect(actual.state).toBe(String(State[State.pomodoro]))
    })

    it('should return a short record', () => {
      const start = new Date('2022-01-01T09:00:00')
      const end = new Date(start.getTime() + duration.pomodoro)
      const actual = builder.createRecord(start, end)
      expect(actual.state).toBe(String(State[State.short]))
    })

    it('should return a pomodoro record', () => {
      const start = new Date('2022-01-01T09:00:00')
      const end = new Date(start.getTime() + duration.pomodoro + duration.short)
      const actual = builder.createRecord(start, end)
      expect(actual.state).toBe(String(State[State.pomodoro]))
    })

    it('should return a long record', () => {
      const start = new Date('2022-01-01T09:00:00')
      const end = new Date(start.getTime() + duration.totalTime - 1)
      const actual = builder.createRecord(start, end)
      expect(actual.state).toBe(String(State[State.long]))
    })
  })

  describe('when trying to calculate start date', () => {
    it('should throw an Error if the nth record is invalid', () => {
      expect(() => builder['calculateStart'](0, new Date())).toThrow()
    })

    it('should return the same start date for the first record', () => {
      const start = new Date('2022-01-01T09:00:00')
      const actual = builder['calculateStart'](1, start)
      const expected = start
      expect(actual).toEqual(expected)
    })

    it('should return the expected start date for the second record', () => {
      const start = new Date('2022-01-01T09:00:00')
      const actual = builder['calculateStart'](2, start)
      const expected = new Date(start.getTime() + duration.pomodoro)
      expect(actual).toEqual(expected)
    })

    it('should return the expected start date for the third record', () => {
      const start = new Date('2022-01-01T09:00:00')
      const actual = builder['calculateStart'](3, start)
      const expected = new Date(
        start.getTime() + duration.pomodoro + duration.short
      )
      expect(actual).toEqual(expected)
    })

    it('should return the expected start date for the pomodoro after the first cycle', () => {
      const start = new Date('2022-01-01T09:00:00')
      const actual = builder['calculateStart'](9, start)
      const expected = new Date(start.getTime() + duration.totalTime)
      expect(actual).toEqual(expected)
    })

    it('should return a sequence of start dates based on the number records', () => {
      const start = new Date('2022-01-01T09:00:00')

      // pomodoro
      const expected = [start]
      // short
      expected.push(
        new Date(expected[expected.length - 1].getTime() + duration.pomodoro)
      )
      // pomodoro
      expected.push(
        new Date(expected[expected.length - 1].getTime() + duration.short)
      )
      // short
      expected.push(
        new Date(expected[expected.length - 1].getTime() + duration.pomodoro)
      )
      // pomodoro
      expected.push(
        new Date(expected[expected.length - 1].getTime() + duration.short)
      )
      // short
      expected.push(
        new Date(expected[expected.length - 1].getTime() + duration.pomodoro)
      )
      // pomodoro
      expected.push(
        new Date(expected[expected.length - 1].getTime() + duration.short)
      )
      // long
      expected.push(
        new Date(expected[expected.length - 1].getTime() + duration.pomodoro)
      )
      // pomodoro
      expected.push(
        new Date(expected[expected.length - 1].getTime() + duration.long)
      )

      const actual = Array.from(Array(9)).map((_, i) =>
        builder['calculateStart'](i + 1, start)
      )

      expect(actual).toEqual(expected)
    })
  })
})
