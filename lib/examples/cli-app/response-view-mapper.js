"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapSession = exports.mapTimerSequence = void 0;
const Session_1 = require("./models/Session");
const State_1 = require("./models/State");
const mapTimerSequence = (timerSequence) => {
    return timerSequence.map((ts) => ({
        state: State_1.State[ts.state],
        duration: ts.duration,
    }));
};
exports.mapTimerSequence = mapTimerSequence;
const mapSession = (session) => {
    return new Session_1.Session(Object.assign(Object.assign({}, session), { timerSequence: (0, exports.mapTimerSequence)(session.timerSequence) }));
};
exports.mapSession = mapSession;
//# sourceMappingURL=response-view-mapper.js.map