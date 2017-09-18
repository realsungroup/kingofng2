import { Component, OnInit, ElementRef,AfterViewInit } from '@angular/core';
import { BaseHttpService } from '../../../base-http-service/base-http.service';
import { BaseComponent } from '../../../base-component/base.component';
import { AppService } from '../../../app.service';
import { Router} from '@angular/router';
import { MainService } from '../../main.service';

declare var XLSX:any; 
declare var saveAs:any; 

@Component({
  selector: 'app-shop-order-detail',
  templateUrl: './shop-order-detail.component.html',
  styleUrls: ['./shop-order-detail.component.scss']
})
export class ShopOrderDetailComponent extends BaseComponent implements OnInit,AfterViewInit {

  url: string = '';
  requestParams: any = {};
  requestDataType: number = -1;

  constructor(private httpSev: BaseHttpService, private el:ElementRef,protected mainSev:MainService,protected appSev: AppService, protected router: Router) {
    super(mainSev,appSev,router);

    let path = this.httpSev.path;
    this.url = path.baseUrl + path.getData;
    this.requestParams = {
      resid: 536149223685,
      pageIndex: 0,
      pageSize: 10,
      getcolumninfo: 1
    }
    this.requestDataType = this.httpSev.dataT.HostTableDataEM;

  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngAfterViewInit(){
    console.dir();
  }

  exportExcel() { 
    var wopts = { bookType: 'xlsx', bookSST: false, type: 'binary' };

    var worksheet = XLSX.utils.table_to_book(this.el.nativeElement.querySelector('table'));
    var wbout = XLSX.write(worksheet, wopts);

    function s2ab(s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    }

    /* the saveAs call downloads a file on the local machine */
    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "商品详情.xlsx");
  }

}
