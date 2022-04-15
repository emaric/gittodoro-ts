"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionCLIApp = void 0;
const SessionController_1 = require("../../controller/SessionController");
const EndSessionCommand_1 = require("../../interactor/use-cases/EndSessionCommand");
const StartSessionCommand_1 = require("../../interactor/use-cases/StartSessionCommand");
const presenter_1 = require("./presenter");
const db_1 = require("./db");
class SessionCLIApp {
    constructor(cliView) {
        this.storage = new db_1.SessionInMemory([]);
        this.presenter = new presenter_1.SessionCLIPresenter(cliView);
        this.controller = new SessionController_1.SessionController();
    }
    start() {
        if (!this.startCommand) {
            this.startCommand = new StartSessionCommand_1.StartSessionCommand(this.storage, this.presenter);
        }
        this.startCommand.execute(Object.assign({ message: 'Start a session', start: new Date() }, SessionCLIApp.DEFAULT_DURATION));
    }
    stop() {
        if (!this.stopCommand) {
            this.stopCommand = new EndSessionCommand_1.EndSessionCommand(this.storage, this.presenter);
        }
        this.stopCommand.execute({
            message: 'End a session',
            end: new Date(),
        });
    }
}
exports.SessionCLIApp = SessionCLIApp;
SessionCLIApp.DEFAULT_DURATION = {
    pomodoro: 25,
    short: 5,
    long: 10,
    longInterval: 4,
};
//# sourceMappingURL=controller.js.map