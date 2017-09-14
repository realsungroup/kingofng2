import { Component, OnInit } from '@angular/core';
import { BaseHttpService } from '../../../../base-http-service/base-http.service';

@Component({
  selector: 'app-shop-order-sended',
  templateUrl: './shop-order-sended.component.html',
  styleUrls: ['./shop-order-sended.component.scss']
})
export class ShopOrderSendedComponent implements OnInit {

  url: string = '';
  requestParams: any = {};
  requestDataType: number = -1;
  tabs:Array<any> = [];

  constructor(private httpSev: BaseHttpService) { }

  ngOnInit() {
    let path = this.httpSev.path;
    this.url = path.baseUrl + path.getData;
    this.requestParams = {
      resid: 558722057400,
      pageIndex: 0,
      pageSize: 10,
      getcolumninfo: 1,
      cmswhere: "Status = '待收货'"
    }
    this.tabs = [{
      isSubForm: false,
      formName: "default"
    }];

    this.requestDataType = this.httpSev.dataT.HostTableDataEM;
  }

}
