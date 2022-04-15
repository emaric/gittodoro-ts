"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
const State_1 = require("./State");
class Session {
    constructor(obj) {
        this.start = obj.start;
        this.end = obj.end;
        this.pomodoro = obj.pomodoro;
        this.short = obj.short;
        this.long = obj.long;
        this.longInterval = obj.longInterval;
        this.timerSequenceDuration = obj.timerSequenceDuration;
        this.timerSequence = obj.timerSequence;
    }
    get elapsed() {
        const from = this.start.getTime() / 1000;
        const to = (this.end ? this.end.getTime() : Date.now()) / 1000;
        return Math.round(to - from);
    }
    get state() {
        return this.calcStateRemainingTime().state;
    }
    get remainingTime() {
        return this.calcStateRemainingTime().remainingTime;
    }
    calcStateRemainingTime() {
        const stateElapsed = this.elapsed % this.timerSequenceDuration;
        const result = { index: -1, sum: 0 };
        this.timerSequence.some((a, i) => {
            result.index = i;
            result.sum += a.duration;
            if (result.sum > stateElapsed) {
                return true;
            }
        }, result);
        return {
            state: State_1.State[this.timerSequence[result.index].state],
            remainingTime: result.sum - stateElapsed,
        };
    }
    toString() {
        return JSON.stringify(this);
    }
}
exports.Session = Session;
//# sourceMappingURL=Session.js.map