import {Component, OnInit, ViewChild, ElementRef, AfterViewInit} from "@angular/core";
import {DashboardComponent, WidgetComponent,WidgetDefinition,REGISTRY} from "../dist";
import {MyWidgetComponent} from "./my-widget/my-widget.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {
    '(window:resize)': '_onResize($event)',
  }
})
export class AppComponent implements OnInit,AfterViewInit {
  title = 'app works!';
  @ViewChild(DashboardComponent) dashboard: DashboardComponent;
  widgetsSize: number[] = [150, 150];
  dashboardMargin: number = 1;

  constructor(private _ngEl: ElementRef) {

  }

  get width() {
    return this._ngEl.nativeElement.offsetWidth;
  }

  get height() {
    return this._ngEl.nativeElement.offsetHeight;
  }

  ngOnInit(): void {
    this._onResize(null);
  }

  ngAfterViewInit() {
    ///this.setWidgetSizes();
    this._onResize(null);
  }

  private _onResize(event: any) {
    if (window.innerWidth < 750) {
      this.dashboardMargin = 5;
      this.widgetsSize = [this.dashboard.width / 2 - this.dashboardMargin, this.widgetsSize[1]];
    }
    else {
      this.dashboardMargin = 10;
      const nbColumn = Math.floor(this.dashboard.width / (300 + this.dashboardMargin));
      this.widgetsSize = [this.dashboard.width / nbColumn - this.dashboardMargin, this.widgetsSize[1]];
    }
  }

  log(widget: WidgetComponent, type: string) {
   // console.log(widget, type);
  }

  logOrder(order: Array<string>) {
   // console.log(order, 'orderchange');
  }

  addWidget() {
    const ref: WidgetComponent = this.dashboard.addItem(REGISTRY.get("app-my-widget"));
    ref.widgetId = Math.random()+'';
    ref.conf = new WidgetDefinition(
      {'name':"my_custom",
        'data_attribute_name':'data',
        'data_model_type':'CountService'
      }
      );
  }

  close(e: any, id: string) {
    this.dashboard.removeItemById(id);
    e.preventDefault();
    e.stopPropagation();
  }
}
