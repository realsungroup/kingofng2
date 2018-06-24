import { Component, OnInit, ElementRef,Injector } from '@angular/core';
import { BaseHttpService } from '../../../base-http-service/base-http.service';
import { BaseComponent } from '../../../base-component/base.component';
import { AppService } from '../../../app.service';
import { Router } from '@angular/router';
import { MainService } from '../../main.service';
import { LZUntilService } from '../../../../lib/lzTableComponent/until/until.service';

declare var XLSX: any;
declare var saveAs: any;

@Component({
  selector: 'app-menu-order-tongji',
  templateUrl: './menu-order-tongji.component.html',
  styleUrls: ['./menu-order-tongji.component.scss']
})
export class MenuOrderTongjiComponent extends BaseComponent implements OnInit {

  url: string = '';
  requestParams: any = {};
  requestDataType: number = -1;

  constructor(private httpSev: BaseHttpService,injector:Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();

    let path = this.httpSev.path;
    this.url = path.baseUrl + path.getData;
    this.requestParams = {
      resid: 583192668236,
      pageIndex: 0,
      pageSize: 200,
      getcolumninfo: 1
    }
    this.requestDataType = this.httpSev.dataT.HostTableDataEM;

    this.dateChangeStr = 'dates';
    this.xlsxFileName = '就餐统计';
  }

}
