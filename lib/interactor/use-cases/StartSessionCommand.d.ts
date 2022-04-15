import { SessionDataGatewayInterface } from '../../interactor/data-gateways/SessionDataGatewayInterface';
import { SessionCommandInterface } from '../../interactor/requests/SessionCommandInterface';
import { StartSessionRequest } from '../../interactor/requests/SessionRequest';
import { SessionPresenterInterface } from '../../interactor/responses/SessionPresenterInterface';
export declare class StartSessionCommand implements SessionCommandInterface {
    sessionDataGateway: SessionDataGatewayInterface;
    sessionPresenter: SessionPresenterInterface;
    constructor(sessionDataGateway: SessionDataGatewayInterface, sessionPresenter: SessionPresenterInterface);
    execute(request: StartSessionRequest): void;
}
//# sourceMappingURL=StartSessionCommand.d.ts.map