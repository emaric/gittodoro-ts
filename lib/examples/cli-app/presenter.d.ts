import { SessionPresenterInterface } from '../../interactor/responses/SessionPresenterInterface';
import { SessionResponse } from '../../interactor/responses/SessionResponse';
import { Session } from './models/Session';
export interface CLIView {
    display(content: Session): void;
}
export declare class SessionCLIPresenter implements SessionPresenterInterface {
    cliView: CLIView;
    constructor(cliView: CLIView);
    present(response: SessionResponse): void;
}
//# sourceMappingURL=presenter.d.ts.map