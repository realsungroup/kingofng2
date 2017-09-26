import { Component, OnInit } from '@angular/core';
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

  startDateString = '';
  endDateString = "";
  _selectStartDate = null;
  _selectEndDate = null;
  _selectDateCmswhere: string = '';

  url: string = '';
  requestParams: any = {};
  requestDataType: number = -1;

  constructor(private httpSev: BaseHttpService, protected mainSev: MainService, protected appSev: AppService, protected router: Router, private utSev: LZUntilService) {
    super(mainSev, appSev, router);
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

  }

  dateChange(event, index) {
    if (!index) this.startDateString = this.utSev.transformDateToString(event, "yyyyMMdd") || '';
    else this.endDateString = this.utSev.transformDateToString(event, "yyyyMMdd") || '';

    if (this.startDateString.length && this.endDateString.length) this._selectDateCmswhere = "C3_512140206161 >='" + this.startDateString + "' AND C3_512140206161 <='" + this.endDateString + "'";
    else this._selectDateCmswhere = "";
  }

}
