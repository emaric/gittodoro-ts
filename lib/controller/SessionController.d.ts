import { SessionCommandInterface } from '../interactor/requests/SessionCommandInterface';
import { EndSessionRequest, StartSessionRequest, ViewSessionRequest } from '../interactor/requests/SessionRequest';
export declare class SessionController {
    startSession(interactor: SessionCommandInterface, request: StartSessionRequest): void;
    endSession(interactor: SessionCommandInterface, request: EndSessionRequest): void;
    viewSession(interactor: SessionCommandInterface, request: ViewSessionRequest): void;
}
//# sourceMappingURL=SessionController.d.ts.map