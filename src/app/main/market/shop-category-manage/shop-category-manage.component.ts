import { Component, OnInit } from '@angular/core';
import { BaseHttpService } from '../../../base-http-service/base-http.service';

@Component({
  selector: 'app-shop-category-manage',
  templateUrl: './shop-category-manage.component.html',
  styleUrls: ['./shop-category-manage.component.scss']
})
export class ShopCategoryManageComponent implements OnInit {

  url = '';
  requestParams: any = {};
  requestDataType = -1;

  options: any = {};

  nodeRequestUrl: string = '';
  nodeRequestParams: any = {};
  nodeRequestDataT: number = -1;

  constructor(private httpSev: BaseHttpService) { }

  ngOnInit() {
    const path = this.httpSev.path;
    this.url = path.baseUrl + path.getSubData;
    this.requestParams = {
      resid: 560949427095,
      pageIndex: 0,
      pageSize: 10,
      subResid: 560949427095,
      hostrecid: ''
    }
    this.requestDataType = this.httpSev.dataT.AttachTableDataEM;


    this.nodeRequestUrl = path.baseUrl + path.getData;
    this.nodeRequestParams = { resid: 560949427095, cmswhere: 'pid = ' };
    this.nodeRequestDataT = this.httpSev.dataT.HostTableDataEM;
  }

  updateRequestParams(note: any) {
    this.requestParams = note;
  }

}
