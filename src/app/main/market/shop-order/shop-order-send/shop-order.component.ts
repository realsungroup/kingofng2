import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { BaseHttpService } from '../../../../base-http-service/base-http.service';
import { BaseComponent } from '../../../../base-component/base.component';
import { AppService } from '../../../../app.service';
import { Router } from '@angular/router';
import { MainService } from '../../../main.service';
import { LZUntilService } from '../../../../../lib/lzTableComponent/until/until.service';

@Component({
  selector: 'app-shop-order',
  templateUrl: './shop-order.component.html',
  styleUrls: ['./shop-order.component.scss']
})
export class ShopOrderComponent extends BaseComponent implements OnInit {
  isOrderRecive: boolean = false;
  isSendModalShow: boolean = false;

  tabs: Array<any> = [];
  operationButton: Array<any> = [];
  url: string = '';
  requestParams: any = {};
  requestDataType: number = -1;

  orderTabs: Array<any> = [];
  resid: string = '';
  _selectData = {};
  attachParams = {};
  attachRequestDataType: number = -1;
  attachRequestUrl: string = '';

  constructor(private httpSev: BaseHttpService, injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
    this.tabs = [{
      isSubForm: false,
      formName: "default"
    }, {
      isSubForm: true,
      formName: "default",
      subFormResid: "536149223685",
      subFormLayout: "form"
    }];

    this.operationButton = [{
      title: '发货', type: 'default', loading: false
    }];

    let path = this.httpSev.path;
    this.url = path.baseUrl + path.getData;
    this.requestParams = {
      resid: 558721970759,
      pageIndex: 0,
      pageSize: 10,
      getcolumninfo: 1
    }
    this.requestDataType = this.httpSev.dataT.HostTableDataEM;

    this.dateChangeStr = 'C3_543089973094';
  }

  operationBtnClick(note) {
    if (!note.i) {
      this.isSendModalShow = true;
      this.resid = this.requestParams['resid'];
      this._selectData = note.data;
      this.orderTabs = [
        {
          isSubForm: false,
          formName: "send"
        }
      ];

      this.attachRequestUrl = this.httpSev.path.baseUrl + this.httpSev.path.getSubData;
      this.attachParams = {
        resid: 558721970759,
        pageIndex: 0,
        pageSize: 10,
        subResid: 559049368638,
        hostrecid: note.data['REC_ID']
      };
      this.attachRequestDataType = this.httpSev.dataT.AttachTableDataEM;
    }
  }

  modalFormNoti() {
    this.isSendModalShow = false;
  }

}
