import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseHttpService } from '../../../../base-http-service/base-http.service';
import { LZcommonTableComponent } from '../../../../../lib/lzTableComponent/commonTable/lzcommon-table.component';

@Component({
  selector: 'app-shop-order',
  templateUrl: './shop-order.component.html',
  styleUrls: ['./shop-order.component.scss']
})
export class ShopOrderComponent implements OnInit {
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
  attachRequestUrl:string = '';

  // @ViewChild(LZcommonTableComponent)
  // private lzCommonTable: LZcommonTableComponent;

  constructor(private httpSev: BaseHttpService) { }

  ngOnInit() {
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

  }

  operationBtnClick(note) {
    // this.lzCommonTable._theModalName = 'form';
    // this.lzCommonTable.isMainData = true;
    if (!note.i) {
      this.isSendModalShow = true;
      this.resid = this.requestParams['resid'];
      console.log("REC_ID" + this.resid)
      this._selectData = note.data;
      this.orderTabs = [
        {
          isSubForm: false,
          formName: "send"
        }
      ];

      this.attachRequestUrl = this.httpSev.path.baseUrl + this.httpSev.path.getSubData;
      this.attachParams = Object.assign({}, this.requestParams);
      this.attachParams['subResid'] = 536149223685;
      this.attachParams['hostrecid'] = note.data['REC_ID'];
      delete this.attachParams['getcolumninfo'];
      this.attachRequestDataType = this.httpSev.dataT.AttachTableDataEM;


    }
  }

  modalFormNoti() {
    this.isSendModalShow = false;
  }

}
