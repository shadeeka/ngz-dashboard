import { ElementRef, EventEmitter, OnInit, Renderer2, OnDestroy } from "@angular/core";
import { WidgetHandleDirective } from "../../directives/widget-handle.directive";
import { WidgetDefinition } from "../../datamodels/widget.definition";
import { DataModelService } from "../../datamodels/datamodel.service";
import { ServiceLocator } from "../../services/service.locator";
export declare class WidgetComponent implements OnInit, OnDestroy {
    protected injector: ServiceLocator;
    protected _ngEl: ElementRef;
    protected _renderer: Renderer2;
    _conf: WidgetDefinition;
    _dataProvider: DataModelService;
    interval: any;
    autoplay: any;
    size: number[];
    widgetId: string;
    conf: WidgetDefinition;
    onSizeChanged: EventEmitter<number[]>;
    onClick: EventEmitter<any>;
    protected _handle: WidgetHandleDirective;
    constructor(injector: ServiceLocator, _ngEl: ElementRef, _renderer: Renderer2);
    ngOnInit(): void;
    setup(): void;
    _initEventListener(): void;
    updateBaseModel(message: any): void;
    updateModel(data: any): void;
    onConfigChange(): void;
    setSize(size: number[]): void;
    readonly element: any;
    readonly offset: any;
    width: number;
    height: number;
    setPosition(top: number, left: number): void;
    setEventListener(cbMouse: Function): void;
    addClass(myClass: string): void;
    removeClass(myClass: string): void;
    readonly handle: any;
    removeFromParent(): void;
    ngOnDestroy(): void;
    secondPlay(): void;
    startPagePlay(): void;
    stopPagePlay(): void;
}
