import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes,Route } from '@angular/router';

import { MainComponent } from '../main/main.component';
import { LoginComponent } from '../main/login/login.component';

import { ShopCategoryComponent } from '../main/market/shop-category/shop-category.component';
import { ShopListComponent } from '../main/market/shop-list/shop-list.component'; 
import { ShopOrderComponent } from '../main/market/shop-order/shop-order-send/shop-order.component';
import { ShopOrderSendedComponent } from '../main/market/shop-order/shop-order-sended/shop-order-sended.component';
import { ShopOrderDetailComponent } from '../main/market/shop-order-detail/shop-order-detail.component';

import { ClearCacheComponent } from '../main/cache/clear-cache/clear-cache.component';

import { MenuManageComponent } from '../main/restraunt/menu-manage/menu-manage.component';
import { MenuPublishComponent } from "../main/restraunt/menu-publish/menu-publish.component";
import { MenuOrderStatisticsComponent } from '../main/restraunt/menu-order-statistics/menu-order-statistics.component';
import { RestrauntOrderComponent } from '../main/restraunt/restraunt-order/restraunt-order.component';

import { EcharttestComponent } from '../main/echarttest/echarttest.component';

const childRouts:Array<any> = [
  // { path: '', redirectTo: 'applying', pathMatch: 'full'},
  { path: 'shopCategory', component: ShopCategoryComponent,link:'/main/shopCategory'},
  { path: 'shopList', component: ShopListComponent,link:'/main/shopList'},
  { path: 'shopOrderSend', component: ShopOrderComponent,link:'/main/shopOrderSend'},
  { path: 'shopOrderDetail', component: ShopOrderDetailComponent,link:'/main/shopOrderDetail'},
  { path: 'shopOrderSended',component:ShopOrderSendedComponent,link:'/main/shopOrderSended'},
  { path: 'clearCache',component:ClearCacheComponent,link:'/main/clearCache'},

  { path: 'menuManage',component:MenuManageComponent,link:'/main/menuManage'},
  { path: 'menuPublish',component:MenuPublishComponent,link:'/main/menuPublish'},
  { path: 'menuOrderStatistics',component:MenuOrderStatisticsComponent,link:'/main/menuOrderStatistics'},
  { path: 'restrauntOrder',component:RestrauntOrderComponent,link:'/main/restrauntOrder'},

  { path: 'echart',component:EcharttestComponent,link:'/main/echart'}
]

const routes: Array<any> = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent ,link:"/login"},
  { path: 'main', component: MainComponent ,children:childRouts,link:"/main"}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRouterModule {}
