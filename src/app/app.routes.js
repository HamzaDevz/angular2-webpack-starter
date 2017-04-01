"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var home_1 = require("./home");
var question_component_1 = require("./question/question.component");
exports.ROUTES = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: home_1.HomeComponent },
    { path: 'question', component: question_component_1.QuestionComponent },
];
