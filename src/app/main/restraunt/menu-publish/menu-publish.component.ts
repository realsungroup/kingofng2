import { Component, OnInit, Injector } from '@angular/core';
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
  url: string = '';
  tabs: Array<any> = [];
  requestParams: any = {};
  requestDataType: number = -1;
  _customBtnArr: Array<any> = [];

  _isPublishModalShow = false;
  _resid:number;
  _selectData = {};
  _publishTabs:Array<any> = [];

  constructor(private httpSev: BaseHttpService, injector:Injector) {
    super(injector);
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

    this._customBtnArr = [
      { title: '发布', type: 'primary', loading: false }
    ]

    this.dateChangeStr = 'C3_529015275277';
  }

  operationBtnClick(note) {
    if (!note.i) {
      this._isPublishModalShow = true;
      this._resid = this.requestParams['resid'];
      this._selectData = note.data;
      this._publishTabs = [
        {
          isSubForm: false,
          formName: "publish"
        }
      ];
    }
  }

  modalFormNoti() {
    this._isPublishModalShow = false;
  }

}
