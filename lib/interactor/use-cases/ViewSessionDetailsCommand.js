"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewSessionDetailsCommand = void 0;
const EntityResponseMapper_1 = require("./mapper/EntityResponseMapper");
class ViewSessionDetailsCommand {
    constructor(sessionDataGateway, sessionPresenter) {
        this.sessionDataGateway = sessionDataGateway;
        this.sessionPresenter = sessionPresenter;
    }
    execute(request) {
        const session = this.sessionDataGateway.readSession(request.start);
        this.sessionPresenter.present((0, EntityResponseMapper_1.mapSession)(session));
    }
}
exports.ViewSessionDetailsCommand = ViewSessionDetailsCommand;
//# sourceMappingURL=ViewSessionDetailsCommand.js.map