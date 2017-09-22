import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class AppService {

   app: any;

  constructor(private http: Http) {

  }

  getAppConfig(): any {
    if (this.app) return this.app;
    else {
      var a = this.loadAppConfigJsonSync()
      return a;
    }
  }

  addProperty(key: string, val: any) {
    this.app[key] = val;
  }

  loadAppConfigJsonSync() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../app.config.json', false);
    xhr.onload = () => {
      this.app = JSON.parse(xhr.response)
    }
    xhr.send();
    this.app = JSON.parse(`{
    "path": {
        "baseUrl": "http://kingofdinner.realsun.me:9091/",
        "loginBaseUrl": "http://192.168.1.113:9091/",
        "getData": "api/100/table/Retrieve",
        "getSubData": "api/100/table/RetrieveRelTableByHostRecord",
        "saveData": "api/100/table/Save",
        "login": "api/Account/Login",
        "getFormDefine":"api/100/table/RetrieveFormDefine",
        "uploadFileUrl": "http://kingofdinner.realsun.me:8081/rispweb/rispservice/SvcUploadFile2.aspx",
        "httppath": "http://kingofdinner.realsun.me:8081/rispweb/upfiles",
        "getColumnsDefine":"api/100/table/RetrieveColumnsDefine",
        "clearCache":"api/100/table/ClearCache"
      },
      "enterprisecode":"9063"
    }`) 
    return this.app;
  }

  loadAppConfigJson(): any {
    var pro = new Promise((resolve, reject) => {
      this.http.get('../app.config.json').map(response => response.json())
        .subscribe(
        data => {
          this.app = data;
          resolve(data);
        },

        err => {
          alert("app.config.json error");
          reject(err);
        });
    }).catch(error => {
      console.error(error);
    });

    return pro;

  }



}


