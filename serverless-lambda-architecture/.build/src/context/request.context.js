"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestContext = void 0;
var routes_1 = require("../assets/routes");
var RequestContext = /** @class */ (function () {
    function RequestContext(event) {
        this.event = event;
        this.accessToken = (event.headers.Authorization || '').replace('Bearer ', '');
        this.public = routes_1.PublicRoutes.includes(event.rawPath);
        this.path = event.rawPath;
    }
    return RequestContext;
}());
exports.RequestContext = RequestContext;
