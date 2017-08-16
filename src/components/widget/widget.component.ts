import {
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  OnDestroy
} from "@angular/core";
import {WidgetHandleDirective} from "../../directives/widget-handle.directive";
import {WidgetDefinition} from "../../datamodels/widget.definition";
import {DataModelService} from "../../datamodels/datamodel.service";
import {ServiceLocator} from "../../services/service.locator";

@Component({
  selector: 'widget',
  template: '<ng-content></ng-content>'
})

export class WidgetComponent implements OnInit,OnDestroy {
  private  _conf:WidgetDefinition;
  private _dataProvider:DataModelService;

  @Input() public size: number[] = [1, 1];
  @Input() public widgetId: string;

  @Input()
  set conf(value:WidgetDefinition){
    if(value){
      this._conf = value;
      this.setup();
    }
  }

  @Output() public onSizeChanged: EventEmitter<number[]> = new EventEmitter<number[]>();
  @ContentChild(WidgetHandleDirective) protected _handle: WidgetHandleDirective;

  constructor(protected injector: ServiceLocator,protected _ngEl: ElementRef,
              protected _renderer: Renderer2 ){
  }

  ngOnInit(): void {
    this._renderer.addClass(this._ngEl.nativeElement, 'widget');
  }

  setup(){
    if(this._conf.hasOwnProperty("data_model_type")){

      console.log(this._conf.data_model_type);

      let svc:DataModelService = this.injector.get(this._conf.data_model_type);

      console.log(svc);
      if(svc){
        this._dataProvider = svc;
        this._dataProvider.setup();
        this._dataProvider.init();
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
  }

  setSize(size: number[]): void {
    this.size = size;
    this.onSizeChanged.emit(this.size);
  }

  public get element(): any {
    return this._ngEl.nativeElement;
  }

  public get offset(): any {
    return this._ngEl.nativeElement.getBoundingClientRect();
  }

  public get width(): number {
    return this._ngEl.nativeElement.offsetWidth;
  }

  public get height(): number {
    return this._ngEl.nativeElement.offsetHeight;
  }

  public set height(height) {
    this._renderer.setStyle(this._ngEl.nativeElement, 'height', height + 'px');
  }

  public set width(width) {
    this._renderer.setStyle(this._ngEl.nativeElement, 'width', width + 'px');
  }

  public setPosition(top: number, left: number): void {
    this._renderer.setStyle(this._ngEl.nativeElement, 'top', top + 'px');
    this._renderer.setStyle(this._ngEl.nativeElement, 'left', left + 'px');
  }

  public setEventListener(cbMouse: Function): void {
    if (this._handle) {
      this._renderer.listen(this._handle.element, 'mousedown', (e: any) => cbMouse(e, this));
      this._renderer.listen(this._handle.element, 'touchstart', (e: any) => cbMouse(e, this));
    }
    else {
      this._renderer.listen(this._ngEl.nativeElement, 'mousedown', (e: any) => cbMouse(e, this));
      this._renderer.listen(this._ngEl.nativeElement, 'touchstart', (e: any) => cbMouse(e, this));
    }
  }

  addClass(myClass: string): void {
    this._renderer.addClass(this._ngEl.nativeElement, myClass);
  }

  removeClass(myClass: string): void {
    this._renderer.removeClass(this._ngEl.nativeElement, myClass);
  }

  get handle(): any {
    return this._handle ? this._handle.element : this.element;
  }

  removeFromParent() {
    this._ngEl.nativeElement.remove();
  }

  ngOnDestroy(): void {
    if(this._dataProvider)
      this._dataProvider.destroy();
  }
}
