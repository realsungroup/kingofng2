import { Component, OnInit, ElementRef, AfterViewInit, ViewChild, Injector, ReflectiveInjector } from '@angular/core';
import { BaseHttpService } from '../../../base-http-service/base-http.service';
import { BaseComponent } from '../../../base-component/base.component';
import { AppService } from '../../../app.service';
import { Router } from '@angular/router';
import { MainService } from '../../main.service';
import { LZUntilService } from '../../../../lib/lzTableComponent/until/until.service';

@Component({
  selector: 'app-shop-order-detail',
  templateUrl: './shop-order-detail.component.html',
  styleUrls: ['./shop-order-detail.component.scss']
})
export class ShopOrderDetailComponent extends BaseComponent implements OnInit, AfterViewInit {
  
  url: string = '';
  requestParams: any = {};
  requestDataType: number = -1;
 
  constructor(protected injector:Injector,private httpSev:BaseHttpService) {
    super(injector);

    let path = httpSev.path;
    this.url = path.baseUrl + path.getData;
    this.requestParams = {
      resid: 536149223685,
      pageIndex: 0,
      pageSize: 10,
      getcolumninfo: 1
    }
    this.requestDataType = httpSev.dataT.HostTableDataEM;

    this.dateChangeStr = 'C3_556468176493';
    this.xlsxFileName = '商品订单明细';
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngAfterViewInit() {
  }

}
