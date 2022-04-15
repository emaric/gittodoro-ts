import { SessionDataGatewayInterface } from '@/interactor/data-gateways/SessionDataGatewayInterface';
import { SessionCommandInterface } from '@/interactor/requests/SessionCommandInterface';
import { ViewSessionRequest } from '@/interactor/requests/SessionRequest';
import { SessionPresenterInterface } from '@/interactor/responses/SessionPresenterInterface';
export declare class ViewSessionDetailsCommand implements SessionCommandInterface {
    sessionDataGateway: SessionDataGatewayInterface;
    sessionPresenter: SessionPresenterInterface;
    constructor(sessionDataGateway: SessionDataGatewayInterface, sessionPresenter: SessionPresenterInterface);
    execute(request: ViewSessionRequest): void;
}
//# sourceMappingURL=ViewSessionDetailsCommand.d.ts.map