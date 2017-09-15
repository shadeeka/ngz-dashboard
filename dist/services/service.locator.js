"use strict";
/**
 * Created by:
 * Author: Shadeeka
 * Date: 8/7/17
 * 2016 (c) nCinga Innovations
 */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var datamodel_service_1 = require("../datamodels/datamodel.service");
var ServiceLocator = (function () {
    function ServiceLocator() {
    }
    ServiceLocator.prototype.get = function (name, args) {
        switch (name) {
            default: {
                return new datamodel_service_1.DataModelService();
            }
        }
    };
    ;
    ServiceLocator.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    ServiceLocator.ctorParameters = function () { return []; };
    return ServiceLocator;
}());
exports.ServiceLocator = ServiceLocator;
//# sourceMappingURL=service.locator.js.map