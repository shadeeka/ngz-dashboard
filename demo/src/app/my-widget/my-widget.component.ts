import {Component, Renderer2, ElementRef, forwardRef, Input, ViewChild, OnDestroy} from "@angular/core";
import {WidgetHandleDirective, WidgetComponent, REGISTRY} from "../../dist";
import {ServiceLocatorImpl} from "../services/ServiceLocatorImpl";

const forwardReference = forwardRef(() => MyWidgetComponent);

@Component({
  selector: 'app-my-widget',
  templateUrl: './my-widget.component.html',
  styleUrls: ['./my-widget.component.css'],
  providers: [{provide: WidgetComponent, useExisting: forwardReference}]
})
export class MyWidgetComponent extends WidgetComponent implements OnDestroy{

  @Input() public size: number[] = [2, 1];
  @Input() public widgetId: string;
  @ViewChild(WidgetHandleDirective) protected _handle: WidgetHandleDirective;

  private subscriber:any;
  public num =0;

  constructor(svcLocator: ServiceLocatorImpl,ngEl: ElementRef, renderer: Renderer2) {
    super(svcLocator,ngEl, renderer);
    this.initEventListener();
  }

  initEventListener(){
    /*this.subscriber = this.dataPro.getData().subscribe((val)=>{
     // console.log(val);
      this.num = val;
    });*/
  }
  ngOnDestroy(){

    this.subscriber.unsubscribe();
  }
}
REGISTRY.set("app-my-widget", MyWidgetComponent);
