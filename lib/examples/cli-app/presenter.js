"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionCLIPresenter = void 0;
const response_view_mapper_1 = require("./response-view-mapper");
class SessionCLIPresenter {
    constructor(cliView) {
        this.cliView = cliView;
    }
    present(response) {
        this.cliView.display((0, response_view_mapper_1.mapSession)(response));
    }
}
exports.SessionCLIPresenter = SessionCLIPresenter;
//# sourceMappingURL=presenter.js.map