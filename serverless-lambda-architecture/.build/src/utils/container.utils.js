"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppContainer = void 0;
require("reflect-metadata");
var tsyringe_1 = require("tsyringe");
var auth_model_1 = __importDefault(require("../models/auth.model"));
var config_repository_1 = require("../repository/config.repository");
tsyringe_1.container.registerSingleton('Config', config_repository_1.Config);
tsyringe_1.container.registerSingleton('AuthModel', auth_model_1.default);
exports.AppContainer = tsyringe_1.container;
