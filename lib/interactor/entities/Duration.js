"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Duration = void 0;
const State_1 = require("./State");
class Duration {
    constructor(params) {
        this.id = params.id;
        this.pomodoro = params.pomodoro;
        this.short = params.short;
        this.long = params.long;
        this.longInterval = params.longInterval;
    }
    get timerSequenceDuration() {
        return (this.longInterval * this.pomodoro +
            (this.longInterval - 1) * this.short +
            this.long);
    }
    get timerSequence() {
        const sequence = Array.from(Array(this.longInterval * 2));
        return sequence.map((_, index) => {
            if (index + 1 == sequence.length) {
                return { state: State_1.State.long, duration: this.long };
            }
            else if (index % 2 == 0) {
                return { state: State_1.State.pomodoro, duration: this.pomodoro };
            }
            else {
                return { state: State_1.State.short, duration: this.short };
            }
        });
    }
}
exports.Duration = Duration;
//# sourceMappingURL=Duration.js.map