import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { dataType } from '../enum/http.enum';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Injectable()
export class BaseHttpService {

  public path: any;
  public appConfig: any;
  public dataT = dataType;
  constructor(private http: Http, private appS: AppService, private router: Router) {
    this.updateAppConfig();
  }

  updateAppConfig(){
    this.appConfig = window.app;
    this.path = this.appConfig.path;
  }

  private fixDataWithDataType(data: any, type: dataType) {
    switch (type) {
      case dataType.LoginEM: {
        data.loginMethod = "badgeno";//工号
        data.enterprisecode = this.appConfig.enterprisecode;
      }
        break;

      case dataType.LoginDynamicEM: {
        data.loginMethod = "badgenodynamic";
        data.enterprisecode = this.appConfig.enterprisecode;
      }
        break;
      case dataType.LoginDefaultEM: {
        data.loginMethod = "default";
        data.enterprisecode = this.appConfig.enterprisecode;
      }
        break;

      case dataType.HostTableDataEM: {
        data.uiver = 200;
        data.dynlogin = 1;
      }
        break;

      case dataType.AddOneDataEM: {
        data.uiver = 200;
        data.dynlogin = 1;
        data.data._id = 1;
        data.data._state = "added";
        data.data.REC_ID = 0;
        data.data = JSON.stringify([data.data]);
      }
        break;

      case dataType.AttachTableDataEM: {
        data.uiver = 200;
        data.dynlogin = 1;
      }
        break;

      case dataType.FixOneDataEM: {
        data.uiver = 200;
        data.dynlogin = 1;
        data.data._id = 1;
        data.data._state = "modified";
        data.data = JSON.stringify([data.data]);
      }
        break;

      case dataType.FixMoreDataEM: {
        data.uiver = 200;
        data.dynlogin = 1;
        data.data = JSON.stringify(data.data);
      }
        break;

      case dataType.DeleteOneDataEM: {
        data.uiver = 200;
        data.dynlogin = 1;
        data.data._id = 1;
        data.data._state = "removed";
        data.data = JSON.stringify([data.data]);
      }
        break;

      case dataType.AddMoreAndFixMore: {
        data.uiver = 200;
        data.dynlogin = 1;
        data.data.add.forEach(item => {
          item._id = 1;
          item._state = "added";
          item.REC_ID = 0;
        });

        data.data.fix.forEach(item => {
          item._id = 1;
          item._state = "modified";
        });
        data.data = data.data.add.concat(data.data.fix);
        data.data = JSON.stringify(data.data);
      }

    }
    return data;
  }

  private getHeaderWithUrl(str: any) {
    if (str != this.path.baseUrl + this.path.login) {
      if (!this.appConfig.userInfo || !Object.keys(this.appConfig.userInfo).length) {
        console.error("用户信息错误");
        this.router.navigate(["/login"]);
        return;
      }

      let headers = new Headers({
        "userCode": this.appConfig.userInfo.UserCode,
        "accessToken": this.appConfig.userInfo.AccessToken,
        "loginmethod": "default",
        "badgeno": this.appConfig.badgeNo,
        "enterprisecode": this.appConfig.enterprisecode,
        "unionid": "11"
      });

      return headers;
    } else return new Headers();
  }

  baseRequest(type: string, url: string, params: any, dType?: dataType) {
    let baseObser: Observable<any>;
    let headers = this.getHeaderWithUrl(url); console.log("header=>" + JSON.stringify(headers));
    let options = new RequestOptions({ headers: headers });
    params = this.fixDataWithDataType(params, dType);
    switch (type) {
      case "GET": {
        options.search = params;
        baseObser = this.http.get(url, options)
          .map(rsp => rsp.json())
          .catch(error => Observable.throw(error));
      }
        break;

      case "POST": {
        baseObser = this.http.post(url, params, options)
          .map(rsp => rsp.json())
          .catch(error => Observable.throw(error));
      }
        break;
    }
    return baseObser;
  }


  private extractData(res: Response): any {
    let body: any = res.json();
    //this._logService.logMsg(body);
    console.log(body);
    // if (body.OpResult == "Y") {
    //   return JSON.parse(body.Data) || {};
    // }
    // else {
    //   return {};
    // }
    return body;
  }


  private handleError(error: any) {
    let errMsg: any = (error.message) ? error.message : error.status ? '${error.status}-${error.statusText}' : 'Server error';

    //this._logService.errorMsg(errMsg);
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
