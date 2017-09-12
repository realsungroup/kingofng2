import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../base-http-service/base-http.service';
import { AppService } from '../../app.service';
import { dataType } from '../../enum/http.enum';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {
  path: any;

  constructor(private httpService: BaseHttpService,
    private appSve: AppService,
    private router:Router) {
    this.path = this.appSve.getAppConfig()["path"];
  }

  public login(type: string,loginParams:any) {
    let userStr: string = loginParams["account"]; //'80881';
    let params;
    let url = this.path.baseUrl + this.path.login;
    this.appSve.addProperty("badgeNo", userStr);

    if (type == 'badgeno') {
      let passWordStr: string = '123456';
      params = { "badgeno": userStr, "Password": passWordStr };
      return this.httpService.baseRequest("POST", url, params, dataType.LoginEM);
    } else if (type == 'badgenodynamic') {
      let ucode: string = loginParams["ucode"]; //'GHgfPHoXCQno+l0KaDrIOg==';
      params = { "badgeno": userStr, "Ucode": ucode };
      return this.httpService.baseRequest("POST", url, params, dataType.LoginDynamicEM);
    }else {
      params = { "code": '001', "Password": '123456' };
      return this.httpService.baseRequest("POST", url, params, dataType.LoginDefaultEM);
    }
  }

  // 获取假期数据
  public getVacationCategory() {
    let url = this.path.baseUrl + this.path.getData;
    let params = {
      'resid': 542128856156,
      'subresid': '',
      'cmswhere': '',
      'key': ''
    }
    return new Observable(resolve => {
      this.httpService.baseRequest("GET", url, params, dataType.HostTableDataEM).subscribe(
        data => {
          if (data && data.data) {
            let dataArr = data.data;
            let tmpArr = [];
            for (let i = 0; i < dataArr.length; i++) {
              tmpArr.push(dataArr[i].C3_533402301362);
            }
            this.appSve.addProperty("rule", dataArr);
            this.appSve.addProperty("vacationCategory", tmpArr);
            // self.data.vacationCategorySuccess = true
            // self.gotoApplyPage();
            console.log("获取假期类别成功");
            resolve.next();
          } else {
            // cmAlert('获取假期类别失败')
            resolve.error();
          }

          resolve.complete();
        }, err => {
          console.log("获取假期类别失败");
          // cmAlert('获取假期类别失败')
          resolve.error("1 fail");
          resolve.complete();
        });
    })

  }

  //获取审批人
  getTeamApprove() {
    let url = this.path.baseUrl + this.path.getData;
    let params = {
      'resid': 542225544503,
      'subresid': '',
      'cmswhere': '',
      'key': ''
    }
    this.httpService.baseRequest("GET", url, params, dataType.HostTableDataEM).subscribe(
      data => {

        if (data && data.data && data.data[0]) {
          var dataArr = data.data;

          if (dataArr[0].C3_541450807755 == dataArr[0].C3_541450797951) {
            this.appSve.addProperty("teamApprove", dataArr[0].C3_541467332728);
          } else {
            this.appSve.addProperty("teamApprove", dataArr[0].C3_541450797951);
          }
          console.log("获取审批组长类别成功");
        } else {
          // cmAlert('获取审批组长类别失败');
        }

      }, err => {
        console.log("获取审批组长类别失败");
        // cmAlert('获取审批组长类别失败');
      });


  }

  //获取拒绝数据
  getRefuseData() {
    let params = {
      'resid': 541705605790,
      'subresid': '',
      'cmswhere': '',
      'key': ''
    }
    let url = this.path.baseUrl + this.path.getData;
    return new Observable(observer => {
      this.httpService.baseRequest("GET", url, params, dataType.HostTableDataEM).subscribe(
        data => {
          if (data && data.data) {
            let dataArr = data.data;
            let tmpArr = [];
            for (let i = 0; i < dataArr.length; i++) {
              tmpArr.push(dataArr[i].C3_541705620055);
            }
            this.appSve.addProperty("refuseArr", tmpArr);

            // self.data.refuseArrSuccess = true
            // self.gotoApplyPage();
            observer.next();
          } else {
            // cmAlert('获取退回理由失败')
            observer.error();
          }
          observer.complete();
        }, function () {
          // cmAlert('获取退回理由失败')
          observer.error();
          observer.complete();
        });
    })
  }

  getRouteData() {
    // 558542569195
    let params = {
      'resid': 558542569195
    }
    let url = this.path.baseUrl + this.path.getData;
    return new Observable(observer => {
      this.httpService.baseRequest("GET", url, params, dataType.HostTableDataEM).subscribe(
        data => {
          if (data && data.data) {
            let dataArr = data.data;
            this.appSve.addProperty("routesArr", dataArr);

            let filterRouteArr = this.filterRoute(this.router.config[2].children, dataArr);
            this.router.config[2].children = filterRouteArr;

            observer.next();
          } else {
            // cmAlert('获取退回理由失败')
            observer.error();
          }
          observer.complete();
        }, 
        err => {
          // cmAlert('获取退回理由失败')
          observer.error();
          observer.complete();
        },
      () => {
          // observer.complete();
      });
    })

  }

    filterRoute(routes: Array<any>, routeArr: Array<any>) {
    return routes.filter((r: any) => {
      if (r.hasOwnProperty("pathMatch")) return true;

      if (!!!routeArr.filter(val => {
        if (r.link == val.C3_558541978410) {
          r.class = val.C3_558541922352;
          r.parent = val.C3_558541922352;
          r.title = val.C3_558541943043;
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
