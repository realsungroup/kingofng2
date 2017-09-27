import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { LzcommonTableModule } from '../../../lib/lzTableComponent/commonTable/lzcommon-table.module';

import { CompanyBalanceTableComponent } from './company-balance-table/company-balance-table.component';
import { SupplierBalanceTableComponent } from './supplier-balance-table/supplier-balance-table.component';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    LzcommonTableModule
  ],
  declarations: [
    CompanyBalanceTableComponent,
    SupplierBalanceTableComponent
  ]
})
export class CompanyBalanceModule { }
