import { Duration } from './Duration';
import { StateTimer } from './StateTimer';
export declare class Session {
    id: number;
    start: Date;
    end?: Date | undefined;
    duration: Duration;
    constructor(params: {
        id: number;
        start: Date;
        end?: Date | undefined;
        duration: Duration;
    });
    get timerSequenceDuration(): number;
    get timerSequence(): StateTimer[];
    toString(): string;
}
//# sourceMappingURL=Session.d.ts.map