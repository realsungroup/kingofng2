import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../base-component/base.component';
import { BaseHttpService } from '../../../base-http-service/base-http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from '../../main.service';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-shop-category',
  templateUrl: './shop-category.component.html',
  styleUrls: ['./shop-category.component.scss']
})
export class ShopCategoryComponent extends BaseComponent implements OnInit {

  url: string = '';
  requestParams: any = {};
  requestDataType: number = -1;

  constructor(private httpSev: BaseHttpService,protected mainSev:MainService,protected appSev: AppService, protected router: Router) {
    super(mainSev,appSev,router);

    let path = this.httpSev.path;
    this.url = path.baseUrl + path.getData;
    this.requestParams = {
      resid: 535456813135,
      pageIndex: 0,
      pageSize: 10,
      getcolumninfo: 1
    }
    this.requestDataType = this.httpSev.dataT.HostTableDataEM;
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
