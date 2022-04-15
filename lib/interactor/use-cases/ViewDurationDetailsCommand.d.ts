import { DurationDataGatewayInterface } from '@/interactor/data-gateways/DurationDataGatewayInterface';
import { DurationCommandInterface } from '@/interactor/requests/DurationCommandInterface';
import { DurationRequest } from '@/interactor/requests/DurationRequest';
import { DurationPresenterInterface } from '@/interactor/responses/DurationPresenterInterface';
export declare class ViewDurationDetailsCommand implements DurationCommandInterface {
    dataGateway: DurationDataGatewayInterface;
    presenter: DurationPresenterInterface;
    constructor(dataGateway: DurationDataGatewayInterface, presenter: DurationPresenterInterface);
    execute(request: DurationRequest): void;
}
//# sourceMappingURL=ViewDurationDetailsCommand.d.ts.map