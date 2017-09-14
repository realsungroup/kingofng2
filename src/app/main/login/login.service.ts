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
      let passWordStr: string = '1234567';
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
                let routeJson = `[{"class":"0","parent":"","path": "main","title":"我的申请","link":"/main"},


                      {"class":"0","parent":"","path": "test12","title":"测试12","link":""},
                      {"class":"0","parent":"","path": "test22","title":"测试22","link":"/main/test53"},
                      {"class":"0","parent":"","path": "market","title":"商城管理","link":""},

                      {"class":"1","parent":"market","path": "shopCategory","title":"商品分类","link":"/main/shopCategory"},
                     
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
           
                 routeJson = `[{"C3_558541903900":"0","C3_558541922352":"","C3_558541943043": "main","C3_558541955195":"我的申请","C3_558541978410":"/main"},
                      {"C3_558541903900":"0","C3_558541922352":"","C3_558541943043": "test12","C3_558541955195":"测试12","C3_558541978410":""},
                      {"C3_558541903900":"0","C3_558541922352":"","C3_558541943043": "test22","C3_558541955195":"测试22","C3_558541978410":"/main/test53"},
                      {"C3_558541903900":"0","C3_558541922352":"","C3_558541943043": "market","C3_558541955195":"商城管理","C3_558541978410":""},

                      {"C3_558541903900":"1","C3_558541922352":"market","C3_558541943043": "shopCategory","C3_558541955195":"商品分类","C3_558541978410":"/main/shopCategory"},
                      {"C3_558541903900":"1","C3_558541922352":"market","C3_558541943043": "shopOrder","C3_558541955195":"商品订单","C3_558541978410":""},
                      {"C3_558541903900":"1","C3_558541922352":"market","C3_558541943043": "shopOrderDetail","C3_558541955195":"商品订单明细","C3_558541978410":"/main/shopOrderDetail"},

                      {"C3_558541903900":"2","C3_558541922352":"shopOrder","C3_558541943043": "shopOrderSended","C3_558541955195":"已发货","C3_558541978410":"/main/shopOrderSended"},
                      {"C3_558541903900":"2","C3_558541922352":"shopOrder","C3_558541943043": "shopOrder","C3_558541955195":"待发货","C3_558541978410":"/main/shopOrder"},

                      {"C3_558541903900":"1","C3_558541922352":"main","C3_558541943043": "applying","C3_558541955195":"申请中","C3_558541978410":"/main/applying"},
                      {"C3_558541903900":"1","C3_558541922352":"main","C3_558541943043": "applied","C3_558541955195":"已审批","C3_558541978410":"/main/applied"},
                      {"C3_558541903900":"1","C3_558541922352":"main","C3_558541943043": "applyRefuse","C3_558541955195":"已退回","C3_558541978410":"/main/applyRefuse"},
                      {"C3_558541903900":"1","C3_558541922352":"main","C3_558541943043": "applyHistory","C3_558541955195":"历史记录","C3_558541978410":"/main/applyHistory"},

                      {"C3_558541903900":"1","C3_558541922352":"test12","C3_558541943043": "applyingtest12","C3_558541955195":"申请中test12","C3_558541978410":"/main/applyingtest12"},
                      {"C3_558541903900":"1","C3_558541922352":"test12","C3_558541943043": "appliedtest12","C3_558541955195":"已审批test12","C3_558541978410":"/main/appliedtest12"},
                      {"C3_558541903900":"1","C3_558541922352":"test12","C3_558541943043": "applyRefusetest12","C3_558541955195":"已退回test12","C3_558541978410":"/main/applyRefusetest12"},
                      {"C3_558541903900":"1","C3_558541922352":"test12","C3_558541943043": "applyHistorytest12","C3_558541955195":"历史记录test12","C3_558541978410":"/main/applyHistorytest12"},


                      {"C3_558541903900":"2","C3_558541922352":"applyRefuse","C3_558541943043": "test31","C3_558541955195":"测试31","C3_558541978410":"/main/test31"},
                      {"C3_558541903900":"2","C3_558541922352":"applyRefuse","C3_558541943043": "test32","C3_558541955195":"测试32","C3_558541978410":"/main/test32"},

                      {"C3_558541903900":"3","C3_558541922352":"test31","C3_558541943043": "test41","C3_558541955195":"测试41","C3_558541978410":"/main/test41"},
                      {"C3_558541903900":"3","C3_558541922352":"test31","C3_558541943043": "test42","C3_558541955195":"测试42","C3_558541978410":"/main/test42"},


                      {"C3_558541903900":"4","C3_558541922352":"test41","C3_558541943043": "test51","C3_558541955195":"测试51","C3_558541978410":"/main/test51"},
                      {"C3_558541903900":"4","C3_558541922352":"test41","C3_558541943043": "test52","C3_558541955195":"测试52","C3_558541978410":"/main/test52"}]`;

                      data.data = JSON.parse(routeJson);

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
