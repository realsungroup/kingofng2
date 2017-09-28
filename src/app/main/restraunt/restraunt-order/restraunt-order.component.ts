import { Component, OnInit,Injector } from '@angular/core';
import { BaseHttpService } from '../../../base-http-service/base-http.service';
import { BaseComponent } from '../../../base-component/base.component';
import { AppService } from '../../../app.service';
import { Router } from '@angular/router';
import { MainService } from '../../main.service';
import { LZUntilService } from '../../../../lib/lzTableComponent/until/until.service';

@Component({
  selector: 'app-restraunt-order',
  templateUrl: './restraunt-order.component.html',
  styleUrls: ['./restraunt-order.component.scss']
})
export class RestrauntOrderComponent extends BaseComponent implements OnInit {

  url: string = '';
  requestParams: any = {};
  requestDataType: number = -1;

  constructor(private httpSev: BaseHttpService, injector:Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();

    let path = this.httpSev.path;
    this.url = path.baseUrl + path.getData;
    this.requestParams = {
      resid: 535541982229,
      pageIndex: 0,
      pageSize: 10,
      getcolumninfo: 1
    }
    this.requestDataType = this.httpSev.dataT.HostTableDataEM;

    this.dateChangeStr = 'C3_512140206161';
    this.xlsxFileName = '餐饮订单记录';

  }

}
