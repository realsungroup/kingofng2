import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopCategoryComponent } from './shop-category/shop-category.component';
import { ShopListComponent } from './shop-list/shop-list.component';
import { ShopOrderComponent } from './shop-order/shop-order-send/shop-order.component';
import { ShopOrderSendedComponent } from './shop-order/shop-order-sended/shop-order-sended.component';
import { ShopOrderDetailComponent } from './shop-order-detail/shop-order-detail.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';

import { LzcommonTableModule } from '../../../lib/lzTableComponent/commonTable/lzcommon-table.module';
@NgModule({
  imports: [
    CommonModule,
    LzcommonTableModule,
    NgZorroAntdModule,
    FormsModule
  ],
  declarations: [ShopCategoryComponent,ShopListComponent,ShopOrderComponent,ShopOrderDetailComponent,ShopOrderSendedComponent],
  exports:[ShopCategoryComponent,ShopListComponent,ShopOrderComponent,ShopOrderDetailComponent,ShopOrderSendedComponent]
})
export class MarketModule { }
