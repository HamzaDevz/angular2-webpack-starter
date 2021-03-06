"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
var hmr_1 = require("@angularclass/hmr");
var router_1 = require("@angular/router");
/*
 * Platform and Environment providers/directives/pipes
 */
var environment_1 = require("./environment");
var app_routes_1 = require("./app.routes");
// App is our top level component
var app_component_1 = require("./app.component");
var app_resolver_1 = require("./app.resolver");
var app_service_1 = require("./app.service");
var home_1 = require("./home");
var question_1 = require("./question");
var user_1 = require("./user");
var ng2_gridstack_1 = require("ng2-gridstack/ng2-gridstack");
// import { Gridster2Module } from 'angular2gridster';
var angular_gridster2_1 = require("angular-gridster2");
var material_1 = require("@angular/material");
var x_large_1 = require("./home/x-large");
require("../styles/styles.scss");
require("../styles/headings.css");
// Application wide providers
var APP_PROVIDERS = app_resolver_1.APP_RESOLVER_PROVIDERS.concat([
    app_service_1.AppState
]);
/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
var AppModule = (function () {
    function AppModule(appRef, appState) {
        this.appRef = appRef;
        this.appState = appState;
    }
    AppModule.prototype.hmrOnInit = function (store) {
        if (!store || !store.state) {
            return;
        }
        console.log('HMR store', JSON.stringify(store, null, 2));
        // set state
        this.appState._state = store.state;
        // set input values
        if ('restoreInputValues' in store) {
            var restoreInputValues = store.restoreInputValues;
            setTimeout(restoreInputValues);
        }
        this.appRef.tick();
        delete store.state;
        delete store.restoreInputValues;
    };
    AppModule.prototype.hmrOnDestroy = function (store) {
        var cmpLocation = this.appRef.components.map(function (cmp) { return cmp.location.nativeElement; });
        // save state
        var state = this.appState._state;
        store.state = state;
        // recreate root elements
        store.disposeOldHosts = hmr_1.createNewHosts(cmpLocation);
        // save input values
        store.restoreInputValues = hmr_1.createInputTransfer();
        // remove styles
        hmr_1.removeNgStyles();
    };
    AppModule.prototype.hmrAfterDestroy = function (store) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    };
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        bootstrap: [app_component_1.AppComponent],
        declarations: [
            app_component_1.AppComponent,
            home_1.HomeComponent,
            question_1.QuestionComponent,
            user_1.UserComponent,
            x_large_1.XLargeDirective,
            ng2_gridstack_1.GridStackComponent,
            ng2_gridstack_1.GridStackItemDirective,
        ],
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            // Gridster2Module,
            angular_gridster2_1.GridsterModule,
            forms_1.ReactiveFormsModule,
            material_1.MaterialModule,
            router_1.RouterModule.forRoot(app_routes_1.ROUTES, { useHash: true, preloadingStrategy: router_1.PreloadAllModules }),
        ],
        providers: [
            environment_1.ENV_PROVIDERS,
            APP_PROVIDERS
        ]
    })
], AppModule);
exports.AppModule = AppModule;
