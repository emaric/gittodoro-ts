/// <reference types="node" />
import { Session } from '../../examples/cli-app/models/Session';
import { CLIView } from './presenter';
export declare class CLI implements CLIView {
    timeoutTimer?: NodeJS.Timeout;
    intervalTimer?: NodeJS.Timer;
    displayStart(session: Session): void;
    displayRunningSession(session: Session): void;
    displayStoppedSession(session: Session): void;
    display(session: Session): void;
}
//# sourceMappingURL=view.d.ts.map