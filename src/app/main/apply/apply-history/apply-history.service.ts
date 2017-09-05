import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../../base-http-service/base-http.service';
import { AppService } from '../../../app.service';
import { dataType } from '../../../enum/http.enum';

@Injectable()
export class ApplyHistoryService {

   path:any;

  constructor(private httpSev: BaseHttpService,
    private appSev: AppService) { 
      this.path = this.appSev.getAppConfig()["path"];
    }

  // getApplyHistoryTitle(){
  //   let params: any = {
  //     'subresid': '',
  //     'cmswhere': '',
  //     'resid':'541502768110',
  //     'getcolumninfo':'1'
  //   }
  //   let url:string = this.path.baseUrl + this.path.getData;
  //   return this.httpSev.baseRequest("GET", url, params, dataType.HostTableDataEM);
  // }

  getApplyHistoryData(keyStr: string, current: number,pageSize:number){
    let params: any = {
      'subresid': '',
      'cmswhere': '',
      'key': keyStr,
      'pageSize':pageSize,
      'pageIndex':current - 1,
      'resid':'541502768110',
      'getcolumninfo':'1'
    }
    let url:string = this.path.baseUrl + this.path.getData;
    return this.httpSev.baseRequest("GET", url, params, dataType.HostTableDataEM);
  }
}
