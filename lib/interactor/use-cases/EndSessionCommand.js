"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndSessionCommand = void 0;
const EntityResponseMapper_1 = require("./mapper/EntityResponseMapper");
class EndSessionCommand {
    constructor(sessionDataGateway, sessionPresenter) {
        this.sessionDataGateway = sessionDataGateway;
        this.sessionPresenter = sessionPresenter;
    }
    execute(request) {
        const session = this.sessionDataGateway.endSession(request.end);
        this.sessionPresenter.present((0, EntityResponseMapper_1.mapSession)(session));
    }
}
exports.EndSessionCommand = EndSessionCommand;
//# sourceMappingURL=EndSessionCommand.js.map