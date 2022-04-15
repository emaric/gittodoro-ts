"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartSessionCommand = void 0;
const EntityResponseMapper_1 = require("../../interactor/use-cases/mapper/EntityResponseMapper");
class StartSessionCommand {
    constructor(sessionDataGateway, sessionPresenter) {
        this.sessionDataGateway = sessionDataGateway;
        this.sessionPresenter = sessionPresenter;
    }
    execute(request) {
        const session = this.sessionDataGateway.createSession(Object.assign({}, request));
        this.sessionPresenter.present((0, EntityResponseMapper_1.mapSession)(session));
    }
}
exports.StartSessionCommand = StartSessionCommand;
//# sourceMappingURL=StartSessionCommand.js.map