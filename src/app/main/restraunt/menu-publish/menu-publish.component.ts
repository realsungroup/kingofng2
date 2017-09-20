import { Component, OnInit } from '@angular/core';
import { BaseHttpService } from '../../../base-http-service/base-http.service';
import { BaseComponent } from '../../../base-component/base.component';
import { AppService } from '../../../app.service';
import { Router } from '@angular/router';
import { MainService } from '../../main.service';
import { LZUntilService } from '../../../../lib/lzTableComponent/until/until.service';

@Component({
  selector: 'app-menu-publish',
  templateUrl: './menu-publish.component.html',
  styleUrls: ['./menu-publish.component.scss']
})
export class MenuPublishComponent extends BaseComponent implements OnInit {
  startDateString = '';
  endDateString = "";
  url: string = '';
  tabs: Array<any> = [];
  requestParams: any = {};
  requestDataType: number = -1;
  _selectStartDate = null;
  _selectEndDate = null;
  _selectDateCmswhere: string = '';

  constructor(private httpSev: BaseHttpService, mainSev: MainService, appSev: AppService, router: Router, private utSev: LZUntilService) {
    super(mainSev, appSev, router);
  }

  ngOnInit() {
    super.ngOnInit();

    let path = this.httpSev.path;
    this.url = path.baseUrl + path.getData;
    this.requestParams = {
      resid: 530889813533,
      pageIndex: 0,
      pageSize: 10,
      getcolumninfo: 1
    }
    this.requestDataType = this.httpSev.dataT.HostTableDataEM;
    this.tabs = [{
      isSubForm: false,
      formName: "default",
    }]
  }

  dateChange(event, index) {
    if (!index) this.startDateString = this.utSev.transformDateToString(event, "yyyyMMdd") || '';
    else this.endDateString = this.utSev.transformDateToString(event, "yyyyMMdd") || '';

    if (this.startDateString.length && this.endDateString.length) this._selectDateCmswhere = "C3_556468176493 >='" + this.startDateString + "' AND C3_556468176493 <='" + this.endDateString + "'";
    else this._selectDateCmswhere = "";
  }

}
