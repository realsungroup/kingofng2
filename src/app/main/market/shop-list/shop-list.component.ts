import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AppService } from '../../../app.service';
import { dataType } from '../../../enum/http.enum';
import { LZTab } from '../../../../lib/lzTableComponent/interface/tab.interface';
import { MainComponent } from '../../main.component';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from '../../main.service';
import { BaseHttpService } from '../../../base-http-service/base-http.service';
import { BaseComponent } from '../../../base-component/base.component';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss']
})
export class ShopListComponent extends BaseComponent implements OnInit {

  url: string;
  params: any;
  dataT: dataType;
  tabsArr: Array<LZTab>;
  operationButtonTitle: Array<any>;

  filterString: string = 'GcId';
  filterData: Array<any> = [];

  constructor(protected appSev: AppService, protected router: Router,
    private route: ActivatedRoute, protected mainSev: MainService,
    private httpSev: BaseHttpService) {
    super(mainSev,appSev,router);

    let path = window.app['path'];
    this.url = path['baseUrl'] + path['getData'];
    this.params = {
      'subresid': '',
      'cmswhere': '',
      'key': '',
      'pageSize': 10,
      'pageIndex': 0,
      'resid': '535214541525',
      // 'resid':549561320087,
      'getcolumninfo': '1'
    }
    this.dataT = dataType.HostTableDataEM;

    this.operationButtonTitle = [
    { title: 'btn1', type: 'primary', loading: false },
    { title: 'btn2', type: 'default', loading: false },
    { title: 'btn3', type: 'danger', loading: false }];


    let filterRequestParams = {
      'pageSize': 10,
      'pageIndex': 0,
      'resid': '535456813135'
    }

    this.httpSev.baseRequest("GET", this.url, filterRequestParams, this.httpSev.dataT.HostTableDataEM).subscribe(
      data => {
        if (data && data.error == 0 && Array.isArray(data['data'])) {
          let filterArr = [];
          data['data'].forEach(element => {
            filterArr.push({
              title: element['Name'],
              value: element['GcId']
            });
          });
          this.filterData = filterArr;
        }
      }
    )

    this.tabsArr = [{
      isSubForm: false,
      formName: "default",
    }]
  }

  btnClick(i) {
    alert("click index - " + i);
  }


  ngOnInit() {
    super.ngOnInit();
  }

}
