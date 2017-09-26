import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AppRouterModule } from './app-router/app-router.module';
import { MainModule } from './main/main.module';
import { LoginModule } from './main/login/login.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { BaseComponent } from './base-component/base.component';

import { BaseHttpService } from './base-http-service/base-http.service';
import { AppService } from './app.service';

@NgModule({
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    BaseComponent
  ],
  entryComponents:[],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgZorroAntdModule.forRoot(),
    AppRouterModule,
    MainModule,
    LoginModule,
    BrowserAnimationsModule
  ],
  providers: [BaseHttpService, AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
