import { Component, OnInit, ElementRef, Injector } from '@angular/core';
import { MainService } from '../main/main.service';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { LZUntilService } from '../../lib/lzTableComponent/until/until.service';

declare var XLSX: any;
declare var saveAs: any;

@Component({
  selector: 'app-base',
  template: ''
})
export class BaseComponent implements OnInit {

  mainSev:MainService;
  appSev:AppService;
  router:Router;
  utSev:LZUntilService;
  el:ElementRef;

  dateChangeStr:string = '';
  xlsxFileName:string = '';

  startDateString = '';
  endDateString = "";
  _selectStartDate = null;
  _selectEndDate = null;
  _selectDateCmswhere: string = '';

  constructor(protected injector: Injector) {
    this.mainSev = injector.get(MainService);
    this.appSev = injector.get(AppService);
    this.router = injector.get(Router);
    this.utSev = injector.get(LZUntilService);
    this.el = injector.get(ElementRef);
  }

  ngOnInit() {
    this.mainSev.setBreadDataWithUrl(window.app["routesArr"], this.router.url);
  }

  dateChange(event, index) {
    if (!index) this.startDateString = this.utSev.transformDateToString(event, "yyyyMMdd") || '';
    else this.endDateString = this.utSev.transformDateToString(event, "yyyyMMdd") || '';

    if (this.startDateString.length && this.endDateString.length) this._selectDateCmswhere = this.dateChangeStr + " >='" + this.startDateString + "' AND "+ this.dateChangeStr +" <='" + this.endDateString + "'";
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
    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), this.xlsxFileName + ".xlsx");
  }
}
