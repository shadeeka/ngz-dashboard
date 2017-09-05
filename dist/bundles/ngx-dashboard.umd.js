(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/core"));
	else if(typeof define === 'function' && define.amd)
		define(["@angular/core"], factory);
	else if(typeof exports === 'object')
		exports["ngx-dashboard.umd"] = factory(require("@angular/core"));
	else
		root["ngx-dashboard.umd"] = factory(root["@angular/core"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var widget_handle_directive_1 = __webpack_require__(2);
var widget_definition_1 = __webpack_require__(6);
var service_locator_1 = __webpack_require__(3);
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
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], WidgetComponent.prototype, "size", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], WidgetComponent.prototype, "widgetId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", widget_definition_1.WidgetDefinition),
        __metadata("design:paramtypes", [widget_definition_1.WidgetDefinition])
    ], WidgetComponent.prototype, "conf", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], WidgetComponent.prototype, "onSizeChanged", void 0);
    __decorate([
        core_1.ContentChild(widget_handle_directive_1.WidgetHandleDirective),
        __metadata("design:type", widget_handle_directive_1.WidgetHandleDirective)
    ], WidgetComponent.prototype, "_handle", void 0);
    WidgetComponent = __decorate([
        core_1.Component({
            selector: 'widget',
            template: '<ng-content></ng-content>'
        }),
        __metadata("design:paramtypes", [service_locator_1.ServiceLocator, core_1.ElementRef,
            core_1.Renderer2])
    ], WidgetComponent);
    return WidgetComponent;
}());
exports.WidgetComponent = WidgetComponent;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var WidgetHandleDirective = (function () {
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
    WidgetHandleDirective = __decorate([
        core_1.Directive({
            selector: '[widgetHandle]',
            exportAs: 'widgetHandle'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], WidgetHandleDirective);
    return WidgetHandleDirective;
}());
exports.WidgetHandleDirective = WidgetHandleDirective;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by:
 * Author: Shadeeka
 * Date: 8/7/17
 * 2016 (c) nCinga Innovations
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var datamodel_service_1 = __webpack_require__(4);
var ServiceLocator = (function () {
    function ServiceLocator() {
    }
    ServiceLocator.prototype.get = function (name) {
        switch (name) {
            default: {
                return new datamodel_service_1.DataModelService();
            }
        }
    };
    ;
    ServiceLocator = __decorate([
        core_1.Injectable()
    ], ServiceLocator);
    return ServiceLocator;
}());
exports.ServiceLocator = ServiceLocator;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by:
 * Author: Shadeeka
 * Date: 8/6/17
 * 2016 (c) nCinga Innovations
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
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
    DataModelService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], DataModelService);
    return DataModelService;
}());
exports.DataModelService = DataModelService;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var widget_component_1 = __webpack_require__(1);
var DashboardComponent = (function () {
    function DashboardComponent(_componentFactoryResolver, _ngEl, _renderer) {
        this._componentFactoryResolver = _componentFactoryResolver;
        this._ngEl = _ngEl;
        this._renderer = _renderer;
        //  Event Emitters
        this.onDragStart = new core_1.EventEmitter();
        this.onDrag = new core_1.EventEmitter();
        this.onDragEnd = new core_1.EventEmitter();
        this.onOrderChange = new core_1.EventEmitter();
        this.margin = 10;
        this.widgetsSize = [150, 150];
        this.THRESHOLD = 10;
        //    Public variables
        this.dragEnable = true;
        this._width = 0;
        this._nbColumn = 0;
        this._previousPosition = { top: 0, left: 0 };
        this._isDragging = false;
        this._lastOrder = [];
        this._elements = [];
        this._scrollChange = 0;
        this._isScrolling = false;
    }
    DashboardComponent_1 = DashboardComponent;
    Object.defineProperty(DashboardComponent.prototype, "width", {
        get: function () {
            return this._ngEl.nativeElement.offsetWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DashboardComponent.prototype, "height", {
        get: function () {
            return this._ngEl.nativeElement.offsetHeight;
        },
        enumerable: true,
        configurable: true
    });
    DashboardComponent.prototype.setWidgetSizes = function () {
        //console.log("==========setting width and height======== ");
        console.log("Total width :" + this.width);
        var offsetHeight = this._ngEl.nativeElement.offsetParent.clientHeight;
        console.log("Total height :" + offsetHeight);
        var c_width = (this.width - this.margin * 12) / 12;
        var c_height = (offsetHeight - this.margin * 6) / 6;
        this.widgetsSize[0] = c_width;
        this.widgetsSize[1] = c_height;
        //console.log(this._ngEl);
        console.log(this.widgetsSize);
    };
    DashboardComponent.prototype.ngOnChanges = function (changes) {
        // changes.prop contains the old and the new value...
        this._calculSizeAndColumn();
        this._calculPositions();
    };
    DashboardComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this._items.forEach(function (item) {
            item.setEventListener(_this._onMouseDown.bind(_this));
            //this is an ugly ugly ugly hack :( but needed in order to make static and dynamic widget works together
            //FIXME find a way to retrieve a ComponentRef from static widgets instead of this fake one
            _this._elements.push({
                instance: item,
                componentType: null,
                location: null,
                injector: null,
                hostView: null,
                destroy: null,
                onDestroy: null,
                changeDetectorRef: null
            });
        });
        this.setWidgetSizes();
        this._calculSizeAndColumn();
        this._offset = {
            top: this._ngEl.nativeElement.offsetY || this._ngEl.nativeElement.offsetTop,
            left: this._ngEl.nativeElement.offsetX || this._ngEl.nativeElement.offsetLeft
        };
        this._calculPositions();
    };
    DashboardComponent.prototype.refreshWidgets = function () {
        this._calculPositions();
    };
    DashboardComponent.prototype.enableDrag = function () {
        this.dragEnable = true;
        this._renderer.removeClass(this._ngEl.nativeElement, 'disabled');
    };
    DashboardComponent.prototype.disableDrag = function () {
        this.dragEnable = false;
        this._renderer.addClass(this._ngEl.nativeElement, 'disabled');
    };
    DashboardComponent.prototype.addItem = function (ngItem) {
        var _this = this;
        var factory = this._componentFactoryResolver.resolveComponentFactory(ngItem);
        var ref = this._viewCntRef.createComponent(factory);
        var newItem = ref.instance;
        newItem.setEventListener(this._onMouseDown.bind(this));
        newItem.onSizeChanged.subscribe(function () { return _this._calculPositions(); });
        this._elements.push(ref);
        this._calculPositions();
        return newItem;
    };
    DashboardComponent.prototype.clearItems = function () {
        this._viewCntRef.clear();
        this._elements = [];
    };
    DashboardComponent.prototype.getWidgetById = function (widgetId) {
        var element;
        for (var i = 0; i < this._elements.length; i++) {
            element = this._elements[i].instance;
            if (widgetId == element.widgetId) {
                break;
            }
        }
        return element;
    };
    DashboardComponent.prototype.removeItem = function (ngItem) {
        var element;
        for (var i = 0; i < this._elements.length; i++) {
            element = this._elements[i];
            if (element.instance.widgetId == ngItem.widgetId) {
                break;
            }
        }
        this._removeElement(element);
    };
    DashboardComponent.prototype.removeItemByIndex = function (index) {
        var element;
        for (var i = 0; i < this._elements.length; i++) {
            var widget = this._elements[i];
            if (i === index) {
                element = widget;
                break;
            }
        }
        if (element) {
            this._removeElement(element);
        }
    };
    DashboardComponent.prototype.removeItemById = function (id) {
        var element;
        for (var i = 0; i < this._elements.length; i++) {
            var widget = this._elements[i];
            if (widget.instance.widgetId == id) {
                element = widget;
                break;
            }
        }
        if (element) {
            this._removeElement(element);
        }
    };
    DashboardComponent.prototype._removeElement = function (widget) {
        if (!widget)
            return;
        this._enableAnimation();
        var index = widget.hostView == null ? -1 : this._viewCntRef.indexOf(widget.hostView);
        if (index == -1) {
            widget.instance.removeFromParent();
        }
        else {
            this._viewCntRef.remove(index);
        }
        this._elements = this._elements.filter(function (item, i) { return item !== widget; });
        this._calculPositions();
        this._disableAnimation();
    };
    DashboardComponent.prototype._calculPositions = function () {
        var lines = [];
        for (var i = 0; i < this._nbColumn; i++) {
            lines[i] = 0;
        }
        this._positionWidget(lines, this._elements, 0, 0, 0);
    };
    DashboardComponent.prototype._positionWidget = function (lines, items, index, column, row) {
        if (!items[index]) {
            var remainingHeight = 0;
            for (var i = 0; i < lines.length; i++) {
                if (remainingHeight < lines[i]) {
                    remainingHeight = lines[i];
                }
                lines[i]--;
            }
            if (remainingHeight > 0) {
                this._positionWidget(lines, items, index, column, row + 1);
            }
            else {
                var height = row * this.widgetsSize[1] + row * this.margin;
                this._renderer.setStyle(this._ngEl.nativeElement, 'height', height + 'px');
            }
            return;
        }
        var item = items[index].instance;
        var itemWidth = item.size[0];
        if (itemWidth > this._nbColumn) {
            itemWidth = this._nbColumn;
        }
        item.width = this.widgetsSize[0] * itemWidth + (itemWidth - 1) * this.margin;
        item.height = this.widgetsSize[1] * item.size[1] + (item.size[1] - 1) * this.margin;
        var haveEnoughSpace = column + itemWidth - 1 <= this._nbColumn;
        while (lines[column] > 0 || !haveEnoughSpace) {
            column++;
            haveEnoughSpace = column + itemWidth - 1 <= this._nbColumn;
            if (column >= this._nbColumn) {
                column = 0;
                for (var i = 0; i < lines.length; i++) {
                    lines[i]--;
                }
                row++;
                haveEnoughSpace = column + itemWidth - 1 <= this._nbColumn;
            }
            if (!haveEnoughSpace)
                continue;
            for (var i = 1; i < itemWidth; i++) {
                haveEnoughSpace = lines[column + i] <= 0;
                if (!haveEnoughSpace)
                    break;
            }
        }
        var left = column * this.widgetsSize[0] + column * this.margin + this.margin / 2;
        var top = row * this.widgetsSize[1] + row * this.margin + this.margin / 2;
        lines[column] = item.size[1];
        for (var i = 1; i < itemWidth; i++) {
            lines[column + i] = item.size[1];
        }
        item.setPosition(top, left);
        this._positionWidget(lines, items, index + 1, column, row);
    };
    DashboardComponent.prototype._calculSizeAndColumn = function () {
        this._width = this._ngEl.nativeElement.offsetWidth;
        console.debug("Total width :" + this._width);
        console.debug("Minimum widget width :" + this.widgetsSize[0]);
        console.debug("Margin of widget :" + this.margin);
        this._nbColumn = Math.floor(this._width / (this.widgetsSize[0] + this.margin));
        console.debug("Actual column width :" + this._nbColumn);
    };
    DashboardComponent.prototype._onResize = function (e) {
        this._calculSizeAndColumn();
        this._calculPositions();
    };
    DashboardComponent.prototype._onMouseDown = function (e, widget) {
        this._isDragging = this.dragEnable && e.target === widget.handle;
        if (this._isDragging) {
            this.onDragStart.emit({
                widget: widget,
                event: e
            });
            widget.addClass('active');
            this._currentElement = widget;
            this._offset = this._getOffsetFromTarget(e);
            this._enableAnimation();
            this._lastOrder = this.order;
            if (this._isTouchEvent(e)) {
                e.preventDefault();
                e.stopPropagation();
            }
            this._currentMouseEvent = e;
        }
        return true;
    };
    Object.defineProperty(DashboardComponent.prototype, "order", {
        get: function () {
            return this._elements.map(function (elt) { return elt.instance.widgetId; });
        },
        enumerable: true,
        configurable: true
    });
    DashboardComponent.prototype._onMouseMove = function (e) {
        if (this._isDragging) {
            //scroll while drag
            if (this._isTouchEvent(e))
                e = e.touches.length > 0 ? e.touches[0] : e.changedTouches[0];
            var _pageY = e.clientY;
            var y = _pageY;
            var container = document.body;
            var containerTop = container.offsetTop;
            if (window.innerHeight - y < 80) {
                this._isScrolling = true;
                this._scrollDown(container, y, e);
            }
            else if (containerTop + y < 80) {
                this._isScrolling = true;
                this._scrollUp(container, y, e);
            }
            else {
                this._isScrolling = false;
            }
            this.onDrag.emit({
                widget: this._currentElement,
                event: e
            });
            var pos = this._getMousePosition(e);
            var left = pos.left - this._offset.left;
            var top_2 = pos.top - this._offset.top;
            if (Math.abs(pos.top - this._previousPosition.top) > this.THRESHOLD
                || Math.abs(pos.left - this._previousPosition.left) > this.THRESHOLD) {
                this._elements.sort(this._compare);
                this._calculPositions();
                this._previousPosition = pos;
            }
            this._currentElement.setPosition(top_2, left);
            if (this._isTouchEvent(e)) {
                e.preventDefault();
                e.stopPropagation();
            }
            this._currentMouseEvent = e;
        }
        return true;
    };
    DashboardComponent.prototype._scrollDown = function (container, pageY, e) {
        if (this._isDragging && container.scrollTop < (this._ngEl.nativeElement.offsetHeight - window.innerHeight + this._currentElement.height) && this._isScrolling) {
            container.scrollTop += DashboardComponent_1.SCROLL_STEP;
            this._scrollChange = DashboardComponent_1.SCROLL_STEP;
            setTimeout(this._scrollDown.bind(this, container, pageY, e), DashboardComponent_1.SCROLL_DELAY);
        }
        return true;
    };
    DashboardComponent.prototype._scrollUp = function (container, pageY, e) {
        if (this._isDragging && container.scrollTop != 0 && this._isScrolling) {
            container.scrollTop -= DashboardComponent_1.SCROLL_STEP;
            this._scrollChange = -DashboardComponent_1.SCROLL_STEP;
            setTimeout(this._scrollUp.bind(this, container, pageY, e), DashboardComponent_1.SCROLL_DELAY);
        }
        return true;
    };
    DashboardComponent.prototype._onScroll = function (e) {
        if (this._isDragging) {
            var refPos = this._ngEl.nativeElement.getBoundingClientRect();
            var left = void 0;
            var top_3;
            left = this._currentMouseEvent.clientX - refPos.left;
            top_3 = this._currentMouseEvent.clientY - refPos.top;
            this.onDrag.emit({ widget: this._currentElement, event: e });
            left = left - this._offset.left;
            var top_1 = top_3 - this._offset.top + this._scrollChange;
            if (Math.abs(top_3 - this._previousPosition.top) > this.THRESHOLD
                || Math.abs(left - this._previousPosition.left) > this.THRESHOLD) {
                this._elements.sort(this._compare);
                this._calculPositions();
                //  this._previousPosition = pos;
            }
            this._currentElement.setPosition(top_1, left);
        }
        return true;
    };
    DashboardComponent.prototype._onMouseUp = function (e) {
        if (this._isDragging) {
            this._isDragging = false;
            this._isScrolling = false;
            if (this._currentElement) {
                this.onDragEnd.emit({
                    widget: this._currentElement,
                    event: e
                });
                this._currentElement.removeClass('active');
                this._currentElement.addClass('animate');
            }
            this._currentElement = null;
            this._offset = null;
            this._calculPositions();
            this._disableAnimation();
            if (this._isTouchEvent(e)) {
                e.preventDefault();
                e.stopPropagation();
            }
            var currentOrder = this.order;
            var isOrderChanged = JSON.stringify(this._lastOrder) != JSON.stringify(currentOrder);
            if (isOrderChanged) {
                this.onOrderChange.emit(this.order);
            }
        }
        return true;
    };
    DashboardComponent.prototype._manageEvent = function (e) {
        if (this._isTouchEvent(e)) {
            e = e.touches.length > 0 ? e.touches[0] : e.changedTouches[0];
        }
        return e;
    };
    DashboardComponent.prototype._isTouchEvent = function (e) {
        return (window.TouchEvent && e instanceof TouchEvent) || (e.touches || e.changedTouches);
    };
    DashboardComponent.prototype._getOffsetFromTarget = function (e) {
        var x;
        var y;
        var scrollOffset = 0;
        if (this._isTouchEvent(e)) {
            e = e.touches.length > 0 ? e.touches[0] : e.changedTouches[0];
            var rect = e.target.getBoundingClientRect();
            x = e.pageX - rect.left;
            y = e.pageY - rect.top;
            scrollOffset = document.body.scrollTop;
        }
        else {
            x = e.offsetX || e.offsetLeft;
            y = e.offsetY || e.offsetTop;
        }
        return { top: y - scrollOffset, left: x };
    };
    DashboardComponent.prototype._getMousePosition = function (e) {
        e = this._manageEvent(e);
        var refPos = this._ngEl.nativeElement.getBoundingClientRect();
        var left = e.clientX - refPos.left;
        var top = e.clientY - refPos.top;
        return {
            left: left,
            top: top
        };
    };
    DashboardComponent.prototype._compare = function (widget1, widget2) {
        if (widget1.instance.offset.top > widget2.instance.offset.top + widget2.instance.height / 2) {
            return +1;
        }
        if (widget2.instance.offset.top > widget1.instance.offset.top + widget1.instance.height / 2) {
            return -1;
        }
        if ((widget1.instance.offset.left + (widget1.instance.width / 2)) > (widget2.instance.offset.left + (widget2.instance.width / 2))) {
            return +1;
        }
        if ((widget2.instance.offset.left + (widget2.instance.width / 2)) > (widget1.instance.offset.left + (widget1.instance.width / 2))) {
            return -1;
        }
        return 0;
    };
    ;
    DashboardComponent.prototype._enableAnimation = function () {
        var _this = this;
        this._elements.forEach(function (item) {
            if (item.instance != _this._currentElement) {
                item.instance.addClass('animate');
            }
        });
    };
    DashboardComponent.prototype._disableAnimation = function () {
        var _this = this;
        setTimeout(function () {
            _this._elements.forEach(function (item) {
                item.instance.removeClass('animate');
            });
        }, 400);
    };
    //    Private variables
    DashboardComponent.SCROLL_STEP = 15;
    DashboardComponent.SCROLL_DELAY = 100;
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DashboardComponent.prototype, "onDragStart", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DashboardComponent.prototype, "onDrag", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DashboardComponent.prototype, "onDragEnd", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DashboardComponent.prototype, "onOrderChange", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DashboardComponent.prototype, "margin", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], DashboardComponent.prototype, "widgetsSize", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DashboardComponent.prototype, "THRESHOLD", void 0);
    __decorate([
        core_1.ViewChild('target', { read: core_1.ViewContainerRef }),
        __metadata("design:type", core_1.ViewContainerRef)
    ], DashboardComponent.prototype, "_viewCntRef", void 0);
    __decorate([
        core_1.ContentChildren(widget_component_1.WidgetComponent),
        __metadata("design:type", core_1.QueryList)
    ], DashboardComponent.prototype, "_items", void 0);
    DashboardComponent = DashboardComponent_1 = __decorate([
        core_1.Component({
            selector: 'dashboard',
            template: '<div #target><ng-content></ng-content></div>',
            host: {
                '(window:resize)': '_onResize($event)',
                '(document:mousemove)': '_onMouseMove($event)',
                '(document:mouseup)': '_onMouseUp($event)',
                '(document:touchmove)': '_onMouseMove($event)',
                '(document:touchend)': '_onMouseUp($event)',
                '(document:touchcancel)': '_onMouseUp($event)',
                '(document:scroll)': '_onScroll($event)'
            },
            styles: ["\n    :host {\n      position: relative;\n      display: block;\n    }\n\n    :host /deep/ .widget {\n      position: absolute;\n      top: 0;\n      left: 0;\n      -webkit-touch-callout: none; /* iOS Safari */\n      -webkit-user-select: none; /* Chrome/Safari/Opera */\n      -khtml-user-select: none; /* Konqueror */\n      -moz-user-select: none; /* Firefox */\n      -ms-user-select: none; /* Internet Explorer/Edge */\n      user-select: none;\n      /* Non-prefixed version, currently\n                             not supported by any browser */\n    }\n\n    :host /deep/ .widget.animate {\n      -webkit-transition: all 300ms ease-out;\n      -moz-transition: all 300ms ease-out;\n      -o-transition: all 300ms ease-out;\n      transition: all 300ms ease-out;\n    }\n\n    :host /deep/ .widget.active {\n      z-index: 100000;\n    }"
            ]
        }),
        __metadata("design:paramtypes", [core_1.ComponentFactoryResolver,
            core_1.ElementRef,
            core_1.Renderer2])
    ], DashboardComponent);
    return DashboardComponent;
    var DashboardComponent_1;
}());
exports.DashboardComponent = DashboardComponent;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by:
 * Author: Shadeeka
 * Date: 8/6/17
 * 2016 (c) nCinga Innovations
 */
Object.defineProperty(exports, "__esModule", { value: true });
var WidgetDefinition = (function () {
    function WidgetDefinition(obj) {
        this.args = {};
        this.name = obj && obj.name;
        this.data_attribute_name = obj && obj.data_attribute_name;
        this.data_model_type = obj && obj.data_model_type;
        this.args = obj && obj.args;
    }
    return WidgetDefinition;
}());
exports.WidgetDefinition = WidgetDefinition;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(8));
__export(__webpack_require__(1));
__export(__webpack_require__(5));
__export(__webpack_require__(2));
__export(__webpack_require__(4));
__export(__webpack_require__(6));
__export(__webpack_require__(3));
__export(__webpack_require__(9));


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var dashboard_component_1 = __webpack_require__(5);
var widget_component_1 = __webpack_require__(1);
var widget_handle_directive_1 = __webpack_require__(2);
var datamodel_service_1 = __webpack_require__(4);
var service_locator_1 = __webpack_require__(3);
var NgDashboardModule = (function () {
    function NgDashboardModule() {
    }
    NgDashboardModule = __decorate([
        core_1.NgModule({
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
        })
    ], NgDashboardModule);
    return NgDashboardModule;
}());
exports.NgDashboardModule = NgDashboardModule;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by:
 * Author: Shadeeka
 * Date: 8/7/17
 * 2016 (c) nCinga Innovations
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.REGISTRY = new Map();


/***/ })
/******/ ]);
});
//# sourceMappingURL=ngx-dashboard.umd.js.map