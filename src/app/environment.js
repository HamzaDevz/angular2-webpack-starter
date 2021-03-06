"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Angular 2
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var question_service_1 = require("./question/shared/question.service");
var user_service_1 = require("./user/shared/user.service");
var cookies_service_1 = require("angular2-cookie/services/cookies.service");
// Environment Providers
var PROVIDERS = [
    question_service_1.QuestionService,
    user_service_1.UserService,
    cookies_service_1.CookieService,
];
// Angular debug tools in the dev console
// https://github.com/angular/angular/blob/86405345b781a9dc2438c0fbe3e9409245647019/TOOLS_JS.md
var _decorateModuleRef = function (value) { return value; };
if ('production' === ENV) {
    core_1.enableProdMode();
    // Production
    _decorateModuleRef = function (modRef) {
        platform_browser_1.disableDebugTools();
        return modRef;
    };
    PROVIDERS = PROVIDERS.slice();
}
else {
    _decorateModuleRef = function (modRef) {
        var appRef = modRef.injector.get(core_1.ApplicationRef);
        var cmpRef = appRef.components[0];
        var _ng = window.ng;
        platform_browser_1.enableDebugTools(cmpRef);
        window.ng.probe = _ng.probe;
        window.ng.coreTokens = _ng.coreTokens;
        return modRef;
    };
    // Development
    PROVIDERS = PROVIDERS.slice();
}
exports.decorateModuleRef = _decorateModuleRef;
exports.ENV_PROVIDERS = PROVIDERS.slice();
