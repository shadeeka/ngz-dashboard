"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var widget_handle_directive_1 = require("../../directives/widget-handle.directive");
var service_locator_1 = require("../../services/service.locator");
var WidgetComponent = (function () {
    function WidgetComponent(injector, _ngEl, _renderer) {
        this.injector = injector;
        this._ngEl = _ngEl;
        this._renderer = _renderer;
        this.size = [1, 1];
        this.onSizeChanged = new core_1.EventEmitter();
    }
    Object.defineProperty(WidgetComponent.prototype, "conf", {
        set: function (value) {
            if (value) {
                this._conf = value;
                this.setup();
            }
        },
        enumerable: true,
        configurable: true
    });
    WidgetComponent.prototype.ngOnInit = function () {
        this._renderer.addClass(this._ngEl.nativeElement, 'widget');
    };
    WidgetComponent.prototype.setup = function () {
        if (this._conf.hasOwnProperty("data_model_type")) {
            console.log(this._conf.data_model_type);
            var svc = this.injector.get(this._conf.data_model_type);
            //console.log(svc);
            if (svc) {
                this._dataProvider = svc;
                this._dataProvider.setup();
                this._dataProvider.init();
                this._initEventListener();
            }
            else {
                console.error("404 service not found:" + this._conf.data_model_type);
            }
            /*
            * var DataModelConstructor; // data model constructor function
      
             if (angular.isFunction(dataModelType)) {
             DataModelConstructor = dataModelType;
             } else if (angular.isString(dataModelType)) {
             $injector.invoke([dataModelType, function (DataModelType) {
             DataModelConstructor = DataModelType;
             }]);
             } else {
             throw new Error('widget dataModelType should be function or string');
             }
      
             var ds;
             if (widget.dataModelArgs) {
             ds = new DataModelConstructor(widget.dataModelArgs);
             } else {
             ds = new DataModelConstructor();
             }
             widget.dataModel = ds;
             ds.setup(widget, scope);
             ds.init();
      
             * */
        }
    };
    WidgetComponent.prototype._initEventListener = function () {
        var _this = this;
        this._dataProvider.onUpdateScope().subscribe(function (data) {
            _this.updateModel(data);
        });
    };
    WidgetComponent.prototype.updateModel = function (data) {
        console.log("updates component here");
    };
    WidgetComponent.prototype.setSize = function (size) {
        this.size = size;
        this.onSizeChanged.emit(this.size);
    };
    Object.defineProperty(WidgetComponent.prototype, "element", {
        get: function () {
            return this._ngEl.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WidgetComponent.prototype, "offset", {
        get: function () {
            return this._ngEl.nativeElement.getBoundingClientRect();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WidgetComponent.prototype, "width", {
        get: function () {
            return this._ngEl.nativeElement.offsetWidth;
        },
        set: function (width) {
            this._renderer.setStyle(this._ngEl.nativeElement, 'width', width + 'px');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WidgetComponent.prototype, "height", {
        get: function () {
            return this._ngEl.nativeElement.offsetHeight;
        },
        set: function (height) {
            this._renderer.setStyle(this._ngEl.nativeElement, 'height', height + 'px');
        },
        enumerable: true,
        configurable: true
    });
    WidgetComponent.prototype.setPosition = function (top, left) {
        this._renderer.setStyle(this._ngEl.nativeElement, 'top', top + 'px');
        this._renderer.setStyle(this._ngEl.nativeElement, 'left', left + 'px');
    };
    WidgetComponent.prototype.setEventListener = function (cbMouse) {
        var _this = this;
        if (this._handle) {
            this._renderer.listen(this._handle.element, 'mousedown', function (e) { return cbMouse(e, _this); });
            this._renderer.listen(this._handle.element, 'touchstart', function (e) { return cbMouse(e, _this); });
        }
        else {
            this._renderer.listen(this._ngEl.nativeElement, 'mousedown', function (e) { return cbMouse(e, _this); });
            this._renderer.listen(this._ngEl.nativeElement, 'touchstart', function (e) { return cbMouse(e, _this); });
        }
    };
    WidgetComponent.prototype.addClass = function (myClass) {
        this._renderer.addClass(this._ngEl.nativeElement, myClass);
    };
    WidgetComponent.prototype.removeClass = function (myClass) {
        this._renderer.removeClass(this._ngEl.nativeElement, myClass);
    };
    Object.defineProperty(WidgetComponent.prototype, "handle", {
        get: function () {
            return this._handle ? this._handle.element : this.element;
        },
        enumerable: true,
        configurable: true
    });
    WidgetComponent.prototype.removeFromParent = function () {
        this._ngEl.nativeElement.remove();
    };
    WidgetComponent.prototype.ngOnDestroy = function () {
        if (this._dataProvider)
            this._dataProvider.destroy();
    };
    WidgetComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'widget',
                    template: '<ng-content></ng-content>'
                },] },
    ];
    /** @nocollapse */
    WidgetComponent.ctorParameters = function () { return [
        { type: service_locator_1.ServiceLocator, },
        { type: core_1.ElementRef, },
        { type: core_1.Renderer2, },
    ]; };
    WidgetComponent.propDecorators = {
        'size': [{ type: core_1.Input },],
        'widgetId': [{ type: core_1.Input },],
        'conf': [{ type: core_1.Input },],
        'onSizeChanged': [{ type: core_1.Output },],
        '_handle': [{ type: core_1.ContentChild, args: [widget_handle_directive_1.WidgetHandleDirective,] },],
    };
    return WidgetComponent;
}());
exports.WidgetComponent = WidgetComponent;
//# sourceMappingURL=widget.component.js.map