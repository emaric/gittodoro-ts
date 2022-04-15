import { SessionController } from '../../controller/SessionController';
import { CLIView, SessionCLIPresenter } from './presenter';
import { SessionInMemory } from './db';
export declare class SessionCLIApp {
    static DEFAULT_DURATION: {
        pomodoro: number;
        short: number;
        long: number;
        longInterval: number;
    };
    storage: SessionInMemory;
    presenter: SessionCLIPresenter;
    controller: SessionController;
    private startCommand?;
    private stopCommand?;
    constructor(cliView: CLIView);
    start(): void;
    stop(): void;
}
//# sourceMappingURL=controller.d.ts.map