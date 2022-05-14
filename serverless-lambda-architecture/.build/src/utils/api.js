"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = exports.Response = void 0;
var core_1 = __importDefault(require("@middy/core"));
var middlewares_1 = require("../controllers/middlewares");
function Response(_a) {
    var data = _a.data, _b = _a.statusCode, statusCode = _b === void 0 ? 200 : _b, headers = _a.headers, multiValueHeaders = _a.multiValueHeaders;
    return {
        body: JSON.stringify(data || ''),
        statusCode: statusCode,
        headers: headers,
        multiValueHeaders: multiValueHeaders,
    };
}
exports.Response = Response;
function route(handler) {
    return (0, core_1.default)(handler).use([
        middlewares_1.initializeContext,
        middlewares_1.errorHandler,
    ]);
}
exports.route = route;
