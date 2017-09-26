import { Component, OnInit, ElementRef } from '@angular/core';
import { BaseHttpService } from '../../../base-http-service/base-http.service';
import { BaseComponent } from '../../../base-component/base.component';
import { AppService } from '../../../app.service';
import { Router } from '@angular/router';
import { MainService } from '../../main.service';
import { LZUntilService } from '../../../../lib/lzTableComponent/until/until.service';

declare var XLSX: any;
declare var saveAs: any;

@Component({
  selector: 'app-menu-order-statistics',
  templateUrl: './menu-order-statistics.component.html',
  styleUrls: ['./menu-order-statistics.component.scss']
})
export class MenuOrderStatisticsComponent extends BaseComponent implements OnInit {
  startDateString = '';
  endDateString = "";
  _selectStartDate = null;
  _selectEndDate = null;
  _selectDateCmswhere: string = '';

  url: string = '';
  requestParams: any = {};
  requestDataType: number = -1;

  constructor(private httpSev: BaseHttpService, private el: ElementRef, protected mainSev: MainService, protected appSev: AppService, protected router: Router, private utSev: LZUntilService) {
    super(mainSev, appSev, router);
  }

  ngOnInit() {
    super.ngOnInit();

    let path = this.httpSev.path;
    this.url = path.baseUrl + path.getData;
    this.requestParams = {
      resid: 530719253364,
      pageIndex: 0,
      pageSize: 200,
      getcolumninfo: 1
    }
    this.requestDataType = this.httpSev.dataT.HostTableDataEM;

  }

  dateChange(event, index) {
    if (!index) this.startDateString = this.utSev.transformDateToString(event, "yyyyMMdd") || '';
    else this.endDateString = this.utSev.transformDateToString(event, "yyyyMMdd") || '';

    if (this.startDateString.length && this.endDateString.length) this._selectDateCmswhere = "dates >='" + this.startDateString + "' AND dates <='" + this.endDateString + "'";
    else this._selectDateCmswhere = "";
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
    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "菜单订购统计.xlsx");
  }

}
