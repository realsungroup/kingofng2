import { Component, OnInit,Injector } from '@angular/core';
import { BaseComponent } from '../../../base-component/base.component';
import { BaseHttpService } from '../../../base-http-service/base-http.service';

@Component({
  selector: 'app-company-balance-table',
  templateUrl: './company-balance-table.component.html',
  styleUrls: ['./company-balance-table.component.scss']
})
export class CompanyBalanceTableComponent extends BaseComponent implements OnInit {

  url: string = '';
  requestParams: any = {};
  requestDataType: number = -1;

  filterString: string = 'C3_556499703696';
  filterData: Array<any> = [];

  constructor(injector:Injector, private httpSev: BaseHttpService) {
    super(injector);

    let path = this.httpSev.path;
    this.url = path.baseUrl + path.getData;
    this.requestParams = {
      resid: 557444707466,
      pageIndex: 0,
      pageSize: 10,
      getcolumninfo: 1
    }
    this.requestDataType = this.httpSev.dataT.HostTableDataEM;

    let filterRequestParams = {
      'pageSize': 10,
      'pageIndex': 0,
      'resid': '556485392695'
    }

    this.httpSev.baseRequest("GET", this.url, filterRequestParams, this.httpSev.dataT.HostTableDataEM).subscribe(
      data => {
        if (data && data.error == 0 && Array.isArray(data['data'])) {
          let filterArr = [{title:'请选择日期',value:''}];
          data['data'].forEach(element => {
            filterArr.push({
              title: element['C3_556485405809'],
              value: element['C3_556485405809'] + ''
            });
          });
          this.filterData = filterArr;
        }
      }
    )
    this.xlsxFileName = '企业结算报表';
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
