import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {NgDashboardModule} from "../dist";
import {AppComponent} from "./app.component";
import {MyWidgetComponent} from "./my-widget/my-widget.component";
import {CountProvider} from "./data.provider";
import {CountService} from "./services/CountService";
import {ServiceLocatorImpl} from "./services/ServiceLocatorImpl";

@NgModule({
  declarations: [
    AppComponent,
    MyWidgetComponent
  ],
  entryComponents: [
    MyWidgetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgDashboardModule
  ],
  providers: [
    CountProvider,
    //{provide: 'CountService', useClass: CountService},
    { provide: CountService, useValue: CountService},
    ServiceLocatorImpl
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
