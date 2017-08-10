import {NgModule} from "@angular/core";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {WidgetComponent} from "./widget/widget.component";
import {WidgetHandleDirective} from "../directives/widget-handle.directive";
import {DataModelService} from "../datamodels/datamodel.service";
import {ServiceLocator} from "../services/service.locator";

@NgModule({
  declarations: [
    DashboardComponent,
    WidgetComponent,
    WidgetHandleDirective
  ],
  exports: [
    DashboardComponent,
    WidgetComponent,
    WidgetHandleDirective
  ],
  providers: [DataModelService,ServiceLocator]
})
export class NgDashboardModule {
}
