import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes,Route } from '@angular/router';

import { MainComponent } from '../main/main.component';
import { LoginComponent } from '../main/login/login.component';
import { TestComponent } from '../main/test/test.component';
import { Test2Component } from '../main/test2/test2.component';

import { ApplyingComponent } from '../main/apply/applying/applying.component';
import { AppliedComponent } from '../main/apply/applied/applied.component';
import { ApplyRefuseComponent } from '../main/apply/apply-refuse/apply-refuse.component';
import { ApplyHistoryComponent } from '../main/apply/apply-history/apply-history.component';

import { ShopCategoryComponent } from '../main/market/shop-category/shop-category.component';
import { ShopListComponent } from '../main/market/shop-list/shop-list.component'; 
import { ShopOrderComponent } from '../main/market/shop-order/shop-order-send/shop-order.component';
import { ShopOrderSendedComponent } from '../main/market/shop-order/shop-order-sended/shop-order-sended.component';
import { ShopOrderDetailComponent } from '../main/market/shop-order-detail/shop-order-detail.component';


const childRouts:Array<any> = [
  { path: '', redirectTo: 'applying', pathMatch: 'full'},
  { path: 'applyingtest12', component: ApplyingComponent,link:'/main/applyingtest12'},
  { path: 'appliedtest12', component: AppliedComponent,link:'/main/appliedtest12'},
  { path: 'applyRefusetest12', component: ApplyRefuseComponent,link:'/main/applyRefusetest12'},
  { path: 'applyHistorytest12', component: ApplyHistoryComponent,link:'/main/applyHistorytest12'},

  { path: 'applying', component: ApplyingComponent,link:'/main/applying'},
  { path: 'applied', component: AppliedComponent,link:'/main/applied'},
  { path: 'applyRefuse', component: ApplyRefuseComponent,link:'/main/applyRefuse'},
  { path: 'applyHistory', component: ApplyHistoryComponent,link:'/main/applyHistory'},
  { path: 'test31', component: TestComponent,link:'/main/test31'},
  { path: 'test32', component: TestComponent,link:'/main/test32'},
  { path: 'test41', component: TestComponent,link:'/main/test41'},
  { path: 'test42', component: TestComponent,link:'/main/test42'},
  { path: 'test51', component: TestComponent,link:'/main/test51'},
  { path: 'test52', component: TestComponent,link:'/main/test52'},

  { path: 'shopCategory', component: ShopCategoryComponent,link:'/main/shopCategory'},
  { path: 'shopList', component: ShopListComponent,link:'/main/shopList'},
  { path: 'shopOrder', component: ShopOrderComponent,link:'/main/shopOrder'},
  { path: 'shopOrderDetail', component: ShopOrderDetailComponent,link:'/main/shopOrderDetail'},
  { path: 'shopOrderSended',component:ShopOrderSendedComponent,link:'/main/shopOrderSended'}
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
