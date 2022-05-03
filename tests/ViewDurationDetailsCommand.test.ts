import { Duration } from '@/interactor/entities/Duration'
import { DurationDataGatewayInterface } from '@/interactor/data-gateways/DurationDataGatewayInterface'
import { DurationRequest } from '@/interactor/requests/DurationRequest'
import {
  DurationBaseResponse,
  DurationResponse,
} from '@/interactor/responses/DurationResponse'
import { DurationPresenterInterface } from '@/interactor/responses/DurationPresenterInterface'
import { ViewDurationDetailsCommand } from '@/interactor/use-cases/ViewDurationDetailsCommand'

class TestDurationDataGateway implements DurationDataGatewayInterface {
  defaultDuration: Duration

  constructor(defaultDuration: Duration) {
    this.defaultDuration = defaultDuration
  }
  getDefaultDuration(): Promise<Duration> {
    return Promise.resolve(this.defaultDuration)
  }
}

class TestDurationPresenter implements DurationPresenterInterface {
  output: string

  constructor(output: string) {
    this.output = output
  }

  present(
    response: DurationBaseResponse
  ): Promise<DurationResponse | undefined> {
    this.output = this.output + JSON.stringify(response.duration)
    return Promise.resolve(response.duration)
  }
}

describe('[ViewDurationDetailsCommand] unit tests', () => {
  describe('when trying to execute view duration details command', () => {
    it('should get a duration response', async () => {
      const sampleDuration = new Duration({
        id: 0,
        pomodoro: 50,
        short: 10,
        long: 15,
        longInterval: 4,
      })

      const testDataGateway = new TestDurationDataGateway(sampleDuration)
      const testPresenter = new TestDurationPresenter('This is the response: ')

      const viewDurationDetailsCommand = new ViewDurationDetailsCommand(
        testDataGateway,
        testPresenter
      )

      const request: DurationRequest = {
        timestamp: new Date(),
        message: 'this is a sample request',
      }
      await viewDurationDetailsCommand.execute(request)

      const expectedOutput =
        'This is the response: ' + JSON.stringify(sampleDuration)

      expect(testPresenter.output).toBe(expectedOutput)
    })
  })
})
