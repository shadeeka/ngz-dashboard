"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var widget_component_1 = require("./widget/widget.component");
var widget_handle_directive_1 = require("../directives/widget-handle.directive");
var datamodel_service_1 = require("../datamodels/datamodel.service");
var service_locator_1 = require("../services/service.locator");
var NgDashboardModule = /** @class */ (function () {
    function NgDashboardModule() {
    }
    NgDashboardModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [
                        dashboard_component_1.DashboardComponent,
                        widget_component_1.WidgetComponent,
                        widget_handle_directive_1.WidgetHandleDirective
                    ],
                    exports: [
                        dashboard_component_1.DashboardComponent,
                        widget_component_1.WidgetComponent,
                        widget_handle_directive_1.WidgetHandleDirective
                    ],
                    providers: [datamodel_service_1.DataModelService, service_locator_1.ServiceLocator]
                },] },
    ];
    /** @nocollapse */
    NgDashboardModule.ctorParameters = function () { return []; };
    return NgDashboardModule;
}());
exports.NgDashboardModule = NgDashboardModule;
//# sourceMappingURL=index.js.map