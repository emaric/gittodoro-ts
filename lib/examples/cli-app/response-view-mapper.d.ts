import { SessionResponse, StateTimer as StateTimerResponse } from '../../interactor/responses/SessionResponse';
import { Session } from './models/Session';
import { StateTimer } from './models/StateTimer';
export declare const mapTimerSequence: (timerSequence: StateTimerResponse[]) => StateTimer[];
export declare const mapSession: (session: SessionResponse) => Session;
//# sourceMappingURL=response-view-mapper.d.ts.map