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
    private router: Router) {
    this.path = this.appSve.getAppConfig()["path"];
  }

  public login(type: string, loginParams: any) {
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
    } else {
      params = { "code": '001', "Password": '123456' };
      return this.httpService.baseRequest("POST", url, params, dataType.LoginDefaultEM);
    }
  }

  getRouteData() {
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
            observer.error();
          }
          observer.complete();
        },
        err => {
          observer.error();
          observer.complete();
        },
        () => {
          // observer.complete();
        });
    })

  }

  private filterRoute(routes: Array<any>, routeArr: Array<any>) {
    return routes.filter((r: any) => {
      if (r.hasOwnProperty("pathMatch") ) return true;

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
