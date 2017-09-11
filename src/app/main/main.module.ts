import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LzcommonTableModule } from '../../lib/lzTableComponent/commonTable/lzcommon-table.module';

import { TestComponent } from './test/test.component';
import { Test2Component } from './test2/test2.component';
import { ApplyingComponent } from '../main/apply/applying/applying.component';
import { AppliedComponent } from '../main/apply/applied/applied.component';
import { ApplyRefuseComponent } from '../main/apply/apply-refuse/apply-refuse.component';
import { ApplyHistoryComponent } from '../main/apply/apply-history/apply-history.component';

import { ApplyingService } from '../main/apply/applying/applying.service';
import { ApplyHistoryService } from '../main/apply/apply-history/apply-history.service';
import { MainService } from './main.service';
/**
 * @whatItDoes Represents the results of the URL matching.
 *
 * * `consumed` is an array of the consumed URL segments.
 * * `posParams` is a map of positional parameters.
 *
 * @experimental
 */
@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule,
    LzcommonTableModule
  ],
  declarations: [MainComponent,
    TestComponent,
    Test2Component,
    ApplyingComponent,
    AppliedComponent,
    ApplyRefuseComponent,
    ApplyHistoryComponent],
  entryComponents: [
  ],
  providers: [ApplyingService,
    ApplyHistoryService,
    MainService],
  exports: [
  ]
})

export class MainModule { };
