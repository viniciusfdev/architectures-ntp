"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppLogger = void 0;
var AppLogger = /** @class */ (function () {
    function AppLogger() {
    }
    AppLogger.format = function (context) {
        var messages = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            messages[_i - 1] = arguments[_i];
        }
        var message = messages.flat().reduce(function (marr, msg) {
            try {
                marr.push(JSON.stringify(msg));
            }
            catch (_a) {
            }
            finally {
                return marr;
            }
        }, []);
        return "".concat(new Date().toUTCString(), " :: ").concat(context, " :: ").concat(message);
    };
    AppLogger.log = function (context) {
        var messages = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            messages[_i - 1] = arguments[_i];
        }
        console.log(AppLogger.format(context, messages));
    };
    AppLogger.error = function (context) {
        var messages = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            messages[_i - 1] = arguments[_i];
        }
        console.error(AppLogger.format(context, messages));
    };
    return AppLogger;
}());
exports.AppLogger = AppLogger;
