"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapSession = exports.mapTimerSequence = void 0;
const State_1 = require("../../entities/State");
const mapTimerSequence = (timerSequence) => {
    return timerSequence.map((stateTimer) => ({
        state: State_1.State[stateTimer.state],
        duration: stateTimer.duration,
    }));
};
exports.mapTimerSequence = mapTimerSequence;
const mapSession = (session) => {
    return Object.assign(Object.assign(Object.assign({}, session), session.duration), { timerSequenceDuration: session.timerSequenceDuration, timerSequence: (0, exports.mapTimerSequence)(session.timerSequence) });
};
exports.mapSession = mapSession;
//# sourceMappingURL=EntityResponseMapper.js.map