"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewDurationDetailsCommand = void 0;
class ViewDurationDetailsCommand {
    constructor(dataGateway, presenter) {
        this.dataGateway = dataGateway;
        this.presenter = presenter;
    }
    execute(request) {
        console.log(request);
        const duration = this.dataGateway.getDefaultDuration();
        this.presenter.present(Object.assign({}, duration));
    }
}
exports.ViewDurationDetailsCommand = ViewDurationDetailsCommand;
//# sourceMappingURL=ViewDurationDetailsCommand.js.map