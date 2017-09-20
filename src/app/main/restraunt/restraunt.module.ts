import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';

import { MenuManageComponent } from './menu-manage/menu-manage.component';
import { MenuPublishComponent } from './menu-publish/menu-publish.component';
import { LzcommonTableModule } from '../../../lib/lzTableComponent/commonTable/lzcommon-table.module';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    LzcommonTableModule
  ],
  declarations: [MenuManageComponent,MenuPublishComponent]
})
export class RestrauntModule { }
