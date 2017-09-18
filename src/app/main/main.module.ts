import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LzcommonTableModule } from '../../lib/lzTableComponent/commonTable/lzcommon-table.module';
import { FormsModule } from '@angular/forms';

import { ClearCacheComponent } from '../main/cache/clear-cache/clear-cache.component';

import { MainService } from './main.service';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule,
    LzcommonTableModule,
    FormsModule
  ],
  declarations: [
    MainComponent,
    ClearCacheComponent],
  entryComponents: [
  ],
  providers: [
    MainService],
  exports: [
  ]
})

export class MainModule { };
