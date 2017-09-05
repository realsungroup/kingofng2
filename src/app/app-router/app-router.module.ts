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

import { aaaaaaaaaaa } from '../base-interface/custom-route';







// let square = <aaaaaaaaaaa>{};
// square.link = "10";
// square.path = "22";



// const routes1: Route[] = [
//   // { path: '', redirectTo: 'login', pathMatch: 'full',link:"/main"},
//   { path: 'login', component: LoginComponent },
//   // { path: 'main', component: MainComponent ,children:childRouts}
// ];

// const fourChildRouts:Array<any> = [
//   { path: 'test33', component: TestComponent,link:'/main/test22/test33'}
// ]

// const threeChildRouts:Array<any> = [
//   { path: 'test21', component: TestComponent,link:'/main/test11/test21',children:fourChildRouts},
//   { path: 'test22', component: Test2Component,link:'/main/test11/test22'},
// ]

// const childRouts:Array<any> = [
//   { path: '',redirectTo:'test11',pathMatch:'full'},
//   { path: 'test11', component: TestComponent,link:'/main/test11',children:threeChildRouts},
//   { path: 'test12', component: TestComponent,link:'/main/test12'}
// ]





const childRouts:Array<any> = [
  { path: '', redirectTo: 'applying', pathMatch: 'full'},
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
