import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzTreeModule } from 'ng-tree-antd';

import { LZcommonTableComponent } from './lzcommon-table.component';
import { WindowModalFormReadonlyComponent } from '../window-modal/modal-form-readonly/modal-form-readonly.component';
import { ModalFormComponent } from '../window-modal/modal-form/modal-form.component';
import { FormItemDynamicComponent } from '../form-item-dynamic/form-item-dynamic.component';
import { FormItemResourceComponent } from '../window-modal/form-item-resource/form-item-resource.component';
import { ExtendTableComponent } from '../../../app/extend-table/extend-table.component';
import { FormItemDynamicPComponent } from '../form-item-dynamic-p/form-item-dynamic-p.component';
import { AddFormDataComponent } from '../window-modal/add-form-data/add-form-data.component';
import { FormTitleDynamicComponent } from '../form-title-dynamic/form-title-dynamic.component';
import { CommonCardComponent } from '../extendTable/common-card/common-card.component';
import { CommonTreeComponent } from '../common-tree/common-tree.component';

import { MergePipe } from '../pipe/merge.pipe';
import { RepeatLoadOverDirective } from '../directive/repeat-load-over.directive';

import { LZUntilService } from '../until/until.service';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    NzTreeModule
  ],
  declarations: [LZcommonTableComponent,
    WindowModalFormReadonlyComponent,
    ModalFormComponent,
    FormItemDynamicComponent,
    FormItemResourceComponent,
    ExtendTableComponent,
    MergePipe,
    FormItemDynamicPComponent,
    AddFormDataComponent,
    FormTitleDynamicComponent,
    CommonCardComponent,
    CommonTreeComponent,
    RepeatLoadOverDirective],
  providers: [LZUntilService],
  exports: [LZcommonTableComponent,
    WindowModalFormReadonlyComponent,
    ModalFormComponent,
    FormItemDynamicComponent,
    FormItemResourceComponent,
    ExtendTableComponent,
    FormItemDynamicPComponent,
    AddFormDataComponent,
    FormTitleDynamicComponent,
    CommonCardComponent,
    CommonTreeComponent]
})
export class LzcommonTableModule { }
