import { Component, OnInit,Injector } from '@angular/core';
import { BaseHttpService } from '../../../../base-http-service/base-http.service';
import { BaseComponent } from '../../../../base-component/base.component';
import { AppService } from '../../../../app.service';
import { Router} from '@angular/router';
import { MainService } from '../../../main.service';
import { LZUntilService } from '../../../../../lib/lzTableComponent/until/until.service';

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

  constructor(private httpSev: BaseHttpService,injector:Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
    let path = this.httpSev.path;
    this.url = path.baseUrl + path.getData;
    this.requestParams = {
      resid: 558722057400,
      pageIndex: 0,
      pageSize: 10,
      getcolumninfo: 1
    }
    this.tabs = [{
      isSubForm: false,
      formName: "default"
    }];

    this.requestDataType = this.httpSev.dataT.HostTableDataEM;

    this.dateChangeStr = 'C3_543089973094';
  }
}
