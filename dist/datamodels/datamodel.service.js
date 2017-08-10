"use strict";
/**
 * Created by:
 * Author: Shadeeka
 * Date: 8/6/17
 * 2016 (c) nCinga Innovations
 */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DataModelService = (function () {
    function DataModelService() {
    }
    DataModelService.prototype.setup = function () {
        console.log("data model setup");
    };
    DataModelService.prototype.init = function () {
        console.log("data model init");
    };
    DataModelService.prototype.update = function () {
        console.log("data model update");
    };
    DataModelService.prototype.destroy = function () {
        console.log("data model destroy");
    };
    DataModelService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    DataModelService.ctorParameters = function () { return []; };
    return DataModelService;
}());
exports.DataModelService = DataModelService;
//# sourceMappingURL=datamodel.service.js.map