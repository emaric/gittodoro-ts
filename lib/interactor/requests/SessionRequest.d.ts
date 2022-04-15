export declare type SessionRequest = {
    message: string;
};
export declare type StartSessionRequest = SessionRequest & {
    start: Date;
    pomodoro: number;
    short: number;
    long: number;
    longInterval: number;
};
export declare type EndSessionRequest = SessionRequest & {
    end: Date;
};
export declare type ViewSessionRequest = SessionRequest & {
    start: Date;
};
//# sourceMappingURL=SessionRequest.d.ts.map