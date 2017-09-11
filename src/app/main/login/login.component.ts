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
          // this.navigateWithPath(path);
        }

      },
      err => {

      }
    )
  }

  loginWithToken(badgeno: string, token: string) {
    this.loginSve.login('badgenodynamic').subscribe(
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
    this.getRouteData();

  }

  getRouteData() {
    // let routeJson = `[{"class":"0","parent":"","path": "main","title":"主要","link":"/main"},
    //                   {"class":"1","parent":"main","path": "apply","title":"我的申请","link":""},
    //                   {"class":"1","parent":"main","path": "test12","title":"测试12","link":"/main/test12"},
    //                   {"class":"2","parent":"apply","path": "applying","title":"申请中","link":"/main/applying"},
    //                   {"class":"2","parent":"apply","path": "applied","title":"已审批","link":"/main/applied"},
    //                   {"class":"2","parent":"apply","path": "applyRefuse","title":"已退回","link":"/main/applyRefuse"},
    //                   {"class":"2","parent":"apply","path": "applyHistory","title":"历史记录","link":"/main/applyHistory"},
    //                   {"class":"3","parent":"applyRefuse","path": "test31","title":"测试31","link":"/main/test31"},
    //                   {"class":"3","parent":"applyRefuse","path": "test31","title":"测试31","link":"/main/test31"},
    //                   {"class":"3","parent":"test31","path": "test32","title":"测试32","link":"/main/test32"},
    //                   {"class":"4","parent":"test31","path": "test41","title":"测试41","link":"/main/test41"},
    //                   {"class":"5","parent":"test41","path": "test51","title":"测试51","link":"/main/test51"},
    //                   {"class":"5","parent":"test41","path": "test52","title":"测试52","link":"/main/test52"}]`;

    let routeJson = `[{"class":"0","parent":"","path": "main","title":"主要","link":"/main"},
                      {"class":"1","parent":"main","path": "apply","title":"我的申请","link":""},
                      {"class":"1","parent":"main","path": "test12","title":"测试12","link":""},
                      {"class":"2","parent":"apply","path": "applying","title":"申请中","link":"/main/applying"},
                      {"class":"2","parent":"apply","path": "applied","title":"已审批","link":"/main/applied"},
                      {"class":"2","parent":"apply","path": "applyRefuse","title":"已退回","link":"/main/applyRefuse"},
                      {"class":"2","parent":"apply","path": "applyHistory","title":"历史记录","link":"/main/applyHistory"},
                      {"class":"3","parent":"applyRefuse","path": "test31","title":"测试31","link":"/main/test31"},
                      {"class":"3","parent":"applyRefuse","path": "test31","title":"测试31","link":"/main/test31"},
                      {"class":"3","parent":"test31","path": "test32","title":"测试32","link":"/main/test32"},
                      {"class":"4","parent":"test31","path": "test41","title":"测试41","link":"/main/test41"},
                      {"class":"5","parent":"test41","path": "test51","title":"测试51","link":"/main/test51"},
                      {"class":"5","parent":"test41","path": "test52","title":"测试52","link":"/main/test52"},
                      {"class":"2","parent":"test12","path": "applying","title":"申请中","link":"/main/applying"},
                      {"class":"2","parent":"test12","path": "applied","title":"已审批","link":"/main/applied"},
                      {"class":"2","parent":"test12","path": "applyRefuse","title":"已退回","link":"/main/applyRefuse"},
                      {"class":"2","parent":"test12","path": "applyHistory","title":"历史记录","link":"/main/applyHistory"}]`;

    localStorage.setItem("routerJson", routeJson);

    let filterRouteArr = this.filterRoute(this.router.config,JSON.parse(routeJson));
    this.router.config = filterRouteArr;
    // console.info("filter Route Arr",filterRouteArr);

    // console.info(this.router.config);
  }

  loginClick() {
    this.loginSve.login('badgeno').subscribe(
      data => {
        console.log("login success" + JSON.stringify(data));

        if (data['OpResult'] != 'Y') { alert(data['ErrorMsg']); return }

        this.appSve.addProperty("userInfo", data);
        this.loginSve.getTeamApprove();
        Observable.forkJoin(this.loginSve.getVacationCategory(), this.loginSve.getRefuseData()).subscribe(
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

  filterRoute(routes: Array<any>, routeArr: Array<any>) {
    return routes.filter((r: any) => {
      if (r.hasOwnProperty("pathMatch")) return true;

      if (!!!routeArr.filter(val => {
        if (r.link == val.link) {
          r.class = val.class;
          r.parent = val.parent;
          r.title = val.title;
          return true;
        } else return false;
      }).length) {
        return false;
      }

      if (r.children && !!r.children.length) {
        console.log("child")
        r.children = this.filterRoute(r.children, routeArr);
      }

      return true;
    })
  }

}
