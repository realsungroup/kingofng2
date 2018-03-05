import { Component, OnInit, EventEmitter, Output, Injector } from '@angular/core';
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

  filterString: string = 'GcId';
  filterData: Array<any> = [];

  constructor(injector: Injector,
    private route: ActivatedRoute,
    private httpSev: BaseHttpService) {
    super(injector);

    let path = window.app['path'];
    this.url = path['baseUrl'] + path['getData'];
    this.params = {
      'cmswhere': '',
      'key': '',
      'pageSize': 10,
      'pageIndex': 0,
      'resid': '535214541525',
      'getcolumninfo': '1',
      // subResid:568722127598
    }
    this.dataT = dataType.HostTableDataEM;

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
              value: element['GcId'] + ''
            });
          });
          this.filterData = filterArr;
        }
      }
    )

    this.tabsArr = [{
      isSubForm: false,
      formName: "default",
    },
    {
      isSubForm: true,
      formName: "default",
      subFormResid:'568722127598'
    }]
  }

  btnClick(i) {
    alert("click index - " + i);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
