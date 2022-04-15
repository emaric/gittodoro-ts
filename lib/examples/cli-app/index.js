"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const view_1 = require("./view");
const controller_1 = require("./controller");
const cli = new view_1.CLI();
const app = new controller_1.SessionCLIApp(cli);
const run = () => {
    console.log('This sample gittodoro app is running...');
    console.log('Use case #1: The user can start a session.');
    app.start();
    return 0;
};
const stop = () => {
    console.log('Use case #2: This user can stop a session.');
    app.stop();
    return 0;
};
exports.default = {
    run,
    stop,
};
//# sourceMappingURL=index.js.map