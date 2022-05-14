"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var errors_utils_1 = require("../utils/errors.utils");
var entrypoints = __importStar(require("./data.repository"));
var config_repository_1 = require("./config.repository");
var tsyringe_1 = require("tsyringe");
var nanoid_1 = require("nanoid");
var Database = /** @class */ (function () {
    function Database(code, config) {
        this.code = code;
        this.config = config;
    }
    Object.defineProperty(Database.prototype, "connection", {
        get: function () {
            var _this = this;
            return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                var config, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.config.getConfiguration(this.code)];
                        case 1:
                            config = _a.sent();
                            data = entrypoints[config.key];
                            if (data) {
                                resolve(entrypoints[config.key]);
                            }
                            else {
                                reject(new errors_utils_1.AppError(409, "The user request don't have a valid identity context"));
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
        },
        enumerable: false,
        configurable: true
    });
    Database.prototype.create = function (collection, data) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connection];
                    case 1:
                        conn = _a.sent();
                        id = (0, nanoid_1.nanoid)(6);
                        conn[collection][id] = __assign(__assign({ id: id }, data), { createdAt: new Date() });
                        return [2 /*return*/, id];
                }
            });
        });
    };
    Database.prototype.retrieve = function (collection, query) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, results, _i, _a, d, match, _b, _c, _d, attribute, value;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        console.log('query', query);
                        return [4 /*yield*/, this.connection];
                    case 1:
                        conn = _e.sent();
                        results = [];
                        if (!conn[collection]) {
                            throw Error('Invalid collection');
                        }
                        for (_i = 0, _a = Object.values(conn[collection]); _i < _a.length; _i++) {
                            d = _a[_i];
                            match = true;
                            for (_b = 0, _c = Object.entries(query); _b < _c.length; _b++) {
                                _d = _c[_b], attribute = _d[0], value = _d[1];
                                if (d[attribute] !== value) {
                                    match = false;
                                    break;
                                }
                            }
                            if (match) {
                                results.push(d);
                            }
                        }
                        return [2 /*return*/, results];
                }
            });
        });
    };
    Database.prototype.update = function (collection, id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var conn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connection];
                    case 1:
                        conn = _a.sent();
                        conn[collection][id] = __assign(__assign({}, conn[collection][id]), data);
                        return [2 /*return*/, id];
                }
            });
        });
    };
    Database.prototype.delete = function (collection, id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, _id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connection];
                    case 1:
                        conn = _a.sent();
                        if (!conn[collection]) {
                            throw Error('Invalid collection');
                        }
                        for (_id in conn[collection]) {
                            if (_id === id) {
                                delete conn[collection][_id];
                                break;
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Database = __decorate([
        (0, tsyringe_1.autoInjectable)(),
        __metadata("design:paramtypes", [String, config_repository_1.Config])
    ], Database);
    return Database;
}());
exports.default = Database;
