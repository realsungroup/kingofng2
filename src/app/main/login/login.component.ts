import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base-component/base.component';
import { Router, RouterModule, Routes, ActivatedRoute, ParamMap } from '@angular/router';
import { TestComponent } from '../test/test.component';
import { LoginService } from './login.service';
import { LoginInterface } from './login.interface';
import { AppService } from '../../app.service';
import { Observable } from 'rxjs';

interface MyRoute {
  title: string;
  link: string;
  children: Array<MyRoute>
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent extends BaseComponent implements OnInit {
  isLoginWithToken: boolean = false;

  loginM: LoginInterface = {
    account: "",
    passWord: ""
  };

  constructor(private router: Router,
    private loginSve: LoginService,
    private appSve: AppService,
    private route: ActivatedRoute) {
    super();

    this.route.queryParams.subscribe(
      data => {
        // alert(JSON.stringify(data));
        let path = data.path;
        let ucode = data.ucode;
        let badgeno = data.badgeno;

        if (path) {
          this.isLoginWithToken = true;

          this.loginWithToken(badgeno, ucode);
          this.navigateWithPath(path);
        }

      },
      err => {

      }
    )
  }

  loginWithToken(badgeno: string, token: string) {
    let params = {
      account:badgeno,//'80881',
      ucode:token//'GHgfPHoXCQno+l0KaDrIOg=='
    }
    this.loginSve.login('badgenodynamic',params).subscribe(
      data => {
        alert("badgenodynamic success" + JSON.stringify(data));
      },
      err => {
        alert("badgenodynamic error" + JSON.stringify(err));
      },
      () => {
        alert("badgenodynamic complete");
      }
    )
  }

  navigateWithPath(path: string) {
    this.router.navigate(['/' + path])
  }

  ngOnInit() {
    // this.getRouteData();
  }

  getRouteData() {

    let routeJson = `[{"class":"0","parent":"","path": "main","title":"我的申请","link":"/main"},
                      {"class":"0","parent":"","path": "test12","title":"测试12","link":""},
                      {"class":"0","parent":"","path": "test22","title":"测试22","link":"/main/test53"},

                      {"class":"1","parent":"main","path": "applying","title":"申请中","link":"/main/applying"},
                      {"class":"1","parent":"main","path": "applied","title":"已审批","link":"/main/applied"},
                      {"class":"1","parent":"main","path": "applyRefuse","title":"已退回","link":"/main/applyRefuse"},
                      {"class":"1","parent":"main","path": "applyHistory","title":"历史记录","link":"/main/applyHistory"},

                      {"class":"1","parent":"test12","path": "applyingtest12","title":"申请中test12","link":"/main/applyingtest12"},
                      {"class":"1","parent":"test12","path": "appliedtest12","title":"已审批test12","link":"/main/appliedtest12"},
                      {"class":"1","parent":"test12","path": "applyRefusetest12","title":"已退回test12","link":"/main/applyRefusetest12"},
                      {"class":"1","parent":"test12","path": "applyHistorytest12","title":"历史记录test12","link":"/main/applyHistorytest12"},


                      {"class":"2","parent":"applyRefuse","path": "test31","title":"测试31","link":"/main/test31"},
                      {"class":"2","parent":"applyRefuse","path": "test32","title":"测试32","link":"/main/test32"},

                      {"class":"3","parent":"test31","path": "test41","title":"测试41","link":"/main/test41"},
                      {"class":"3","parent":"test31","path": "test42","title":"测试42","link":"/main/test42"},


                      {"class":"4","parent":"test41","path": "test51","title":"测试51","link":"/main/test51"},
                      {"class":"4","parent":"test41","path": "test52","title":"测试52","link":"/main/test52"}]`;

    localStorage.setItem("routerJson", routeJson);

    // let filterRouteArr = this.filterRoute(this.router.config[2].children, JSON.parse(routeJson));
    // this.router.config[2].children = filterRouteArr;
    // // console.info("filter Route Arr",filterRouteArr);

    // console.info("this.router.config", this.router.config);
  }

  loginClick() {
    let params = {
      // account:'80881',
      account:'001'
    }
    this.loginSve.login('',params).subscribe(
      data => {
        console.log("login success" + JSON.stringify(data));

        if (data['OpResult'] != 'Y') { alert(data['ErrorMsg']); return }

        this.appSve.addProperty("userInfo", data);
        this.loginSve.getTeamApprove();

        // 
        Observable.forkJoin(this.loginSve.getVacationCategory(), this.loginSve.getRefuseData(),this.loginSve.getRouteData()).subscribe(
          data => {
            this.router.navigate(["/main"]);
            console.log("all success" + JSON.stringify(data));
          },
          err => {
            console.log("some or all err" + JSON.stringify(err));
          },
          () => {
            console.log("all complete");
          })
      },
      err => {
        alert("login fail");
      }
    )
  }


}
