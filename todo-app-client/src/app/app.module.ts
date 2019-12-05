import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MaterialModule} from './shared/material.module';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DialogComponent} from './dialog/dialog.component';
import {TasksComponent} from "./tasks/tasks.component";
import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";
import {environment} from "../environments/environment";

const config: SocketIoConfig = {
  url: 'http://localhost:'+environment.port, options: {}
};

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    SocketIoModule.forRoot(config)
  ],
  entryComponents: [
    DialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
