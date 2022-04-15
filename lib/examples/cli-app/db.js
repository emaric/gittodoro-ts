"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionInMemory = void 0;
const Duration_1 = require("../../interactor/entities/Duration");
const Session_1 = require("../../interactor/entities/Session");
class SessionInMemory {
    constructor(storage) {
        this.storage = storage;
    }
    createSession(args) {
        const session = new Session_1.Session(Object.assign(Object.assign({}, args), { id: this.storage.length, duration: new Duration_1.Duration(Object.assign(Object.assign({}, args), { id: -1 })) }));
        this.storage.push(session);
        return session;
    }
    readSession(start) {
        const session = this.storage.find((session) => session.start.getTime() == start.getTime());
        if (!session) {
            throw new Error('Not found.');
        }
        return session;
    }
    endSession(end) {
        const last = this.storage.length - 1;
        this.storage[last].end = end;
        return this.storage[last];
    }
}
exports.SessionInMemory = SessionInMemory;
//# sourceMappingURL=db.js.map