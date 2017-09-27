import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { LzcommonTableModule } from '../../lib/lzTableComponent/commonTable/lzcommon-table.module';

import { ClearCacheComponent } from '../main/cache/clear-cache/clear-cache.component';

import { MainService } from './main.service';
import { EcharttestComponent } from './echarttest/echarttest.component';

import { MarketModule } from './market/market.module';
import { RestrauntModule } from './restraunt/restraunt.module';
import { CompanyBalanceModule } from './company-balance/company-balance.module';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule,
    LzcommonTableModule,
    FormsModule,
    MarketModule,
    RestrauntModule,
    CompanyBalanceModule
  ],
  declarations: [
    MainComponent,
    ClearCacheComponent,
    EcharttestComponent],
  entryComponents: [
  ],
  providers: [
    MainService],
  exports: [
  ]
})

export class MainModule { };
