import { StateTimer } from './StateTimer';
export declare class Session {
    start: Date;
    end?: Date;
    pomodoro: number;
    short: number;
    long: number;
    longInterval: number;
    timerSequenceDuration: number;
    timerSequence: StateTimer[];
    constructor(obj: {
        start: Date;
        end?: Date;
        pomodoro: number;
        short: number;
        long: number;
        longInterval: number;
        timerSequenceDuration: number;
        timerSequence: StateTimer[];
    });
    get elapsed(): number;
    get state(): string;
    get remainingTime(): number;
    calcStateRemainingTime(): {
        state: string;
        remainingTime: number;
    };
    toString(): string;
}
//# sourceMappingURL=Session.d.ts.map