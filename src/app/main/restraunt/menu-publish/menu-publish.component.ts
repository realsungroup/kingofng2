import { Component, OnInit, Injector } from '@angular/core';
import { BaseHttpService } from '../../../base-http-service/base-http.service';
import { BaseComponent } from '../../../base-component/base.component';

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

    this.dateChangeStr = 'C3_529015275277';
  }

  modalFormNoti() {
    this._isPublishModalShow = false;
  }

}
