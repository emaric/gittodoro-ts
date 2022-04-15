"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
class Session {
    constructor(params) {
        this.id = params.id;
        this.start = params.start;
        this.end = params.end;
        this.duration = params.duration;
    }
    get timerSequenceDuration() {
        return this.duration.timerSequenceDuration;
    }
    get timerSequence() {
        return this.duration.timerSequence;
    }
    toString() {
        return JSON.stringify(this);
    }
}
exports.Session = Session;
//# sourceMappingURL=Session.js.map