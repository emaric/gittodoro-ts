import { Session } from '../../interactor/entities/Session';
export interface SessionDataGatewayInterface {
    createSession(args: {
        start: Date;
        pomodoro: number;
        short: number;
        long: number;
        longInterval: number;
    }): Session;
    readSession(start: Date): Session;
    endSession(end: Date): Session;
}
//# sourceMappingURL=SessionDataGatewayInterface.d.ts.map