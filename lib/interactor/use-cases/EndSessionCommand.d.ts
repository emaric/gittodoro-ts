import { SessionDataGatewayInterface } from '../../interactor/data-gateways/SessionDataGatewayInterface';
import { EndSessionRequest } from '../../interactor/requests/SessionRequest';
import { SessionCommandInterface } from '../../interactor/requests/SessionCommandInterface';
import { SessionPresenterInterface } from '../../interactor/responses/SessionPresenterInterface';
export declare class EndSessionCommand implements SessionCommandInterface {
    sessionDataGateway: SessionDataGatewayInterface;
    sessionPresenter: SessionPresenterInterface;
    constructor(sessionDataGateway: SessionDataGatewayInterface, sessionPresenter: SessionPresenterInterface);
    execute(request: EndSessionRequest): void;
}
//# sourceMappingURL=EndSessionCommand.d.ts.map