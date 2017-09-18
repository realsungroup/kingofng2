import { Component, OnInit } from '@angular/core';
import { BaseHttpService } from '../../../../base-http-service/base-http.service';
import { BaseComponent } from '../../../../base-component/base.component';
import { AppService } from '../../../../app.service';
import { Router} from '@angular/router';
import { MainService } from '../../../main.service';

@Component({
  selector: 'app-shop-order-sended',
  templateUrl: './shop-order-sended.component.html',
  styleUrls: ['./shop-order-sended.component.scss']
})
export class ShopOrderSendedComponent extends BaseComponent implements OnInit {

  url: string = '';
  requestParams: any = {};
  requestDataType: number = -1;
  tabs: Array<any> = [];

  constructor(private httpSev: BaseHttpService,protected mainSev:MainService,protected appSev: AppService, protected router: Router) {
    super(mainSev,appSev,router);
  }

  ngOnInit() {
    super.ngOnInit();
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
