"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var QuestionComponent = (function () {
    function QuestionComponent(formBuilder, question, snackBar) {
        this.formBuilder = formBuilder;
        this.question = question;
        this.snackBar = snackBar;
        this.loader = false;
    }
    QuestionComponent.prototype.ngOnInit = function () {
        this.questionForm = this.formBuilder.group({
            content: ['', forms_1.Validators.required],
        });
    };
    // Callback from child components 'user'
    QuestionComponent.prototype.userCreation = function (userData) {
        this.userData = userData;
    };
    QuestionComponent.prototype.submitForm = function (values) {
        var _this = this;
        this.error = '';
        this.loader = true;
        this.question.create(Object.assign(values, this.userData))
            .subscribe(function (res) {
            _this.loader = false;
            _this.snackBar.open('Success! Your feedBack was sent !', '', {
                duration: 3000
            });
        }, function (err) {
            console.error(err);
            _this.error = err._body;
            _this.loader = false;
        });
    };
    return QuestionComponent;
}());
QuestionComponent = __decorate([
    core_1.Component({
        selector: 'question',
        templateUrl: './question.component.html',
        styleUrls: ['./question-component.css'],
    })
], QuestionComponent);
exports.QuestionComponent = QuestionComponent;
