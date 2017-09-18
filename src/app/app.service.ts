import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class AppService {

  private app: any;

  constructor(private http: Http) {

  }

  getAppConfig(): any {
    if (this.app) return this.app;
    else {
      var a = this.loadAppConfigJsonSync()
      return a;
    }
  }

  addProperty(key:string,val:any){
    this.app[key] = val;
  }

  loadAppConfigJsonSync() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../app.config.json', false);
    xhr.onload = () => {
      this.app = JSON.parse(xhr.response)
    }
    xhr.send();
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


