export declare type StateTimer = {
    state: string;
    duration: number;
};
export declare type SessionResponse = {
    id: number;
    start: Date;
    end?: Date;
    pomodoro: number;
    short: number;
    long: number;
    longInterval: number;
    timerSequenceDuration: number;
    timerSequence: StateTimer[];
};
//# sourceMappingURL=SessionResponse.d.ts.map