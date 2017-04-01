"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
var rxjs_1 = require("rxjs");
var QuestionService = (function () {
    function QuestionService(http) {
        this.http = http;
        this.url = 'http://hamzatei.fr/projets/lumen-rest-api/public/';
    }
    QuestionService.prototype.findAll = function (withInterval) {
        var _this = this;
        if (withInterval) {
            return rxjs_1.Observable.interval(15000)
                .mergeMap(function () { return _this.get("questions"); });
        }
        return this.get("questions");
    };
    QuestionService.prototype.findById = function (id) {
        return this.get("questions/" + id);
    };
    QuestionService.prototype.create = function (data) {
        return this.http.post(this.url + "questions", data)
            .map(function (res) { return res.json(); });
    };
    QuestionService.prototype.get = function (path) {
        return this.http.get(this.url + path)
            .map(function (res) { return res.json(); });
    };
    return QuestionService;
}());
QuestionService = __decorate([
    core_1.Injectable()
], QuestionService);
exports.QuestionService = QuestionService;
