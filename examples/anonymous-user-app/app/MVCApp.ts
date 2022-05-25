import SessionTimerController from '../controller/SessionTimerController'
import SessionTimerModel from '../model/SessionTimerModel'
import SessionTimerView from '../view/SessionTimerView'

export default class MVCApp {
  private view: SessionTimerView
  private model: SessionTimerModel
  private controller: SessionTimerController

  constructor() {
    this.view = new SessionTimerView()
    this.model = new SessionTimerModel()

    this.controller = new SessionTimerController(this.view, this.model)
  }

  async initializeModelDefaultDuration() {
    const duration = await this.controller.getDefaultDuration()
    await this.view.printTimerDetails(duration)
  }

  async startFastSession() {
    // set the default duration to seconds
    await this.view.updateDuration(5 * 1000, 2 * 1000, 3 * 1000, 4)
    if (this.model.defaultDuration) {
      await this.view.printTimerDetails(this.model.defaultDuration)
    }

    await this.start()
  }

  async start() {
    // wait for 1 cycle before stopping the app
    this.view.setOnCycleEnded(async (_) => {
      await this.view.stop()
    })

    // start session
    await this.view.start()
  }
}
