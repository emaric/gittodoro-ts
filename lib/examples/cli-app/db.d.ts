import { SessionDataGatewayInterface } from '../../interactor/data-gateways/SessionDataGatewayInterface';
import { Session } from '../../interactor/entities/Session';
export declare class SessionInMemory implements SessionDataGatewayInterface {
    storage: Session[];
    constructor(storage: Session[]);
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
//# sourceMappingURL=db.d.ts.map