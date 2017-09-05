import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../base-http-service/base-http.service';
import { AppService } from '../../app.service';
import { dataType } from '../../enum/http.enum';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {
  path: any;

  constructor(private httpService: BaseHttpService,
    private appSve: AppService) {
    this.path = this.appSve.getAppConfig()["path"];
  }

  public login() {
    let userStr: string = '80881';
    let passWordStr: string = '1234567';
    let params = { "badgeno": userStr, "Password": passWordStr };
    this.appSve.addProperty("badgeNo", userStr);
    var url = this.path.baseUrl + this.path.login;
    return this.httpService.baseRequest("POST", url, params, dataType.LoginEM);
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
}
