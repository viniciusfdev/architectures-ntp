"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = exports.throwMissingRequiredAttributes = void 0;
function throwMissingRequiredAttributes(object, attributes) {
    if (object == null) {
        throw Error("Missing required attributes: ".concat(attributes));
    }
    var missing = [];
    for (var _i = 0, attributes_1 = attributes; _i < attributes_1.length; _i++) {
        var attribute = attributes_1[_i];
        if (object[attribute] == null) {
            missing.push(attribute);
        }
    }
    if (missing.length > 0) {
        throw new AppError(400, "Missing required attributes: ".concat(attributes));
    }
}
exports.throwMissingRequiredAttributes = throwMissingRequiredAttributes;
var AppError = /** @class */ (function (_super) {
    __extends(AppError, _super);
    function AppError(statusCode, reason) {
        var _this = this;
        if (typeof reason === 'string') {
            _this = _super.call(this, reason) || this;
        }
        else {
            _this = _super.call(this, reason.message) || this;
        }
        _this.statusCode = statusCode;
        return _this;
    }
    return AppError;
}(Error));
exports.AppError = AppError;
