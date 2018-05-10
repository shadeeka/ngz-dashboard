"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var widget_component_1 = require("../widget/widget.component");
var DashboardComponent = /** @class */ (function () {
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
        this.gridLayout = true;
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
        this._columns = 12;
        this._rows = 6;
    }
    Object.defineProperty(DashboardComponent.prototype, "columns", {
        set: function (value) {
            if (value) {
                this._columns = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DashboardComponent.prototype, "rows", {
        set: function (value) {
            if (value) {
                this._rows = value;
            }
        },
        enumerable: true,
        configurable: true
    });
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
        //console.log("Total width :"+this.width);
        var offsetHeight = this._ngEl.nativeElement.offsetParent.clientHeight;
        //console.log("Total height :"+offsetHeight);
        var c_width = (this.width - this.margin * this._columns) / this._columns;
        var c_height = (offsetHeight - this.margin * this._rows) / this._rows;
        this.widgetsSize[0] = c_width;
        this.widgetsSize[1] = c_height;
        //console.log(this._ngEl);
        //console.log(this.widgetsSize);
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
        if (this.gridLayout)
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
        //let container = this._viewCntRefs.find(item=>item.element.nativeElement.id == this.dashboardId);
        if (this._viewCntRef) {
            var ref = this._viewCntRef.createComponent(factory);
            var newItem = ref.instance;
            newItem.setEventListener(this._onMouseDown.bind(this));
            newItem.onSizeChanged.subscribe(function () { return _this._calculPositions(); });
            this._elements.push(ref);
            this._calculPositions();
            return newItem;
        }
        else {
            return null;
        }
    };
    DashboardComponent.prototype.clearItems = function () {
        //let container = this._viewCntRefs.find(item=>item.element.nativeElement.id == this.dashboardId);
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
        //get exact element
        //let container = this._viewCntRefs.find(item=>item.element.nativeElement.id == this.dashboardId);
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
            container.scrollTop += DashboardComponent.SCROLL_STEP;
            this._scrollChange = DashboardComponent.SCROLL_STEP;
            setTimeout(this._scrollDown.bind(this, container, pageY, e), DashboardComponent.SCROLL_DELAY);
        }
        return true;
    };
    DashboardComponent.prototype._scrollUp = function (container, pageY, e) {
        if (this._isDragging && container.scrollTop != 0 && this._isScrolling) {
            container.scrollTop -= DashboardComponent.SCROLL_STEP;
            this._scrollChange = -DashboardComponent.SCROLL_STEP;
            setTimeout(this._scrollUp.bind(this, container, pageY, e), DashboardComponent.SCROLL_DELAY);
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
    DashboardComponent.prototype.getAllElements = function () {
        return this._elements;
    };
    //@ViewChildren('target', {read: ViewContainerRef}) private _viewCntRefs: QueryList<ViewContainerRef>;
    //    Private variables
    DashboardComponent.SCROLL_STEP = 15;
    DashboardComponent.SCROLL_DELAY = 100;
    DashboardComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'dashboard',
                    template: '<div #target [attr.id]="dashboardId"><ng-content></ng-content></div>',
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
                },] },
    ];
    /** @nocollapse */
    DashboardComponent.ctorParameters = function () { return [
        { type: core_1.ComponentFactoryResolver, },
        { type: core_1.ElementRef, },
        { type: core_1.Renderer2, },
    ]; };
    DashboardComponent.propDecorators = {
        'onDragStart': [{ type: core_1.Output },],
        'onDrag': [{ type: core_1.Output },],
        'onDragEnd': [{ type: core_1.Output },],
        'onOrderChange': [{ type: core_1.Output },],
        'margin': [{ type: core_1.Input },],
        'gridLayout': [{ type: core_1.Input },],
        'columns': [{ type: core_1.Input },],
        'rows': [{ type: core_1.Input },],
        'widgetsSize': [{ type: core_1.Input },],
        'THRESHOLD': [{ type: core_1.Input },],
        'dashboardId': [{ type: core_1.Input },],
        '_viewCntRef': [{ type: core_1.ViewChild, args: ['target', { read: core_1.ViewContainerRef },] },],
        '_items': [{ type: core_1.ContentChildren, args: [widget_component_1.WidgetComponent,] },],
    };
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map