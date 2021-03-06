"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var WidgetHandleDirective = /** @class */ (function () {
    function WidgetHandleDirective(_ngEl) {
        this._ngEl = _ngEl;
    }
    Object.defineProperty(WidgetHandleDirective.prototype, "element", {
        get: function () {
            return this._ngEl.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    WidgetHandleDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[widgetHandle]',
                    exportAs: 'widgetHandle'
                },] },
    ];
    /** @nocollapse */
    WidgetHandleDirective.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
    ]; };
    return WidgetHandleDirective;
}());
exports.WidgetHandleDirective = WidgetHandleDirective;
//# sourceMappingURL=widget-handle.directive.js.map