"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionController = void 0;
class SessionController {
    startSession(interactor, request) {
        interactor.execute(request);
    }
    endSession(interactor, request) {
        interactor.execute(request);
    }
    viewSession(interactor, request) {
        interactor.execute(request);
    }
}
exports.SessionController = SessionController;
//# sourceMappingURL=SessionController.js.map