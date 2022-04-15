import { StateTimer } from './StateTimer';
export declare class Duration {
    id: number;
    pomodoro: number;
    short: number;
    long: number;
    longInterval: number;
    constructor(params: {
        id: number;
        pomodoro: number;
        short: number;
        long: number;
        longInterval: number;
    });
    get timerSequenceDuration(): number;
    get timerSequence(): StateTimer[];
}
//# sourceMappingURL=Duration.d.ts.map