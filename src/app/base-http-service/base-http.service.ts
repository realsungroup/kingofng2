import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { dataType } from '../enum/http.enum';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable()
export class BaseHttpService {

  public path: any;
  public appConfig: any;
  public dataT = dataType;
  private loginMethod: string = '';

  constructor(private http: Http, private appS: AppService, private router: Router) {
    this.updateAppConfig();
  }

  updateAppConfig() {
    this.appConfig = window.app;
    this.path = this.appConfig.path;
  }

  private fixDataWithDataType(data: any, type: dataType) {
    switch (type) {
      case dataType.LoginEM: {
        data.loginMethod = "badgeno";//工号
        data.enterprisecode = this.appConfig.enterprisecode;
        this.loginMethod = data.loginMethod;
      }
        break;

      case dataType.LoginDynamicEM: {
        data.loginMethod = "badgenodynamic";
        data.enterprisecode = this.appConfig.enterprisecode;
        this.loginMethod = data.loginMethod;
      }
        break;
      case dataType.LoginDefaultEM: {
        data.loginMethod = "default";
        data.enterprisecode = this.appConfig.enterprisecode;
        this.loginMethod = data.loginMethod;
      }
        break;

      case dataType.LoginDefaultDynamicEM: {
        data.loginMethod = "defaultdynamic";
        data.enterprisecode = this.appConfig.enterprisecode;
        this.loginMethod = data.loginMethod;
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
        if (Array.isArray(data.data)) {
          data.data.forEach(item => {
            item._id = 1;
            item._state = "modified";
          })
        }
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
      break;

      case dataType.SaveMore:{
        data.uiver = 200;
        data.dynlogin = 1;
        if (Array.isArray(data.data)) {
          data.data.forEach(item => {
            item._id = 1;
          })
        }
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
        "loginmethod": this.loginMethod,
        "badgeno": this.appConfig.badgeNo,
        "enterprisecode": this.appConfig.enterprisecode,
        "unionid": "11"
      }); //alert(this.loginMethod)

      return headers;
    } else return new Headers();
  }

  baseRequest(type: string, url: string, params: any, dType?: dataType) {
    if (!environment.production) console.log("params" + JSON.stringify(params));
    let baseObser: Observable<any>;
    let headers = this.getHeaderWithUrl(url); //console.info("header=>" , headers);
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

  updateImg(file) {
    return new Promise((resolve, reject) => {
      let upUrlStr = this.path.uploadFileUrl + '?savepath=c:\\web\\web\\rispweb\\upfiles&httppath=' + this.path.httppath;

      let fd = new FormData();
      fd.append("file", file, 'hello.png');//新建formdata提交，png格式
      var xhr = new XMLHttpRequest();
      xhr.open('POST', upUrlStr);
      xhr.onload = () => {
        var data = JSON.parse(xhr.response);
        if (xhr.status === 200) {
          var imgUrl = data.httpfilename;
          // 上传代码返回结果之后，将图片插入到编辑器中
          resolve(imgUrl);
        } else {
          reject(data);
          alert('error==' + data);
        }
      };

      fd.append("file", file, 'hello.png');//新建formdata提交，png格式
      xhr.send(fd);
    })
  }

  updateImgOfBase64(dataurl) {
    //转换成blob对象
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    let file = new Blob([u8arr], { type: mime });
    return this.updateImg(file);
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
