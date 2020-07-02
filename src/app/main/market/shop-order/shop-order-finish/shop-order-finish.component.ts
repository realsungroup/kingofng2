import { Component, OnInit, Injector } from "@angular/core";
import { BaseHttpService } from "../../../../base-http-service/base-http.service";
import { BaseComponent } from "../../../../base-component/base.component";
import { AppService } from "../../../../app.service";
import { Router } from "@angular/router";
import { MainService } from "../../../main.service";
import { LZUntilService } from "../../../../../lib/lzTableComponent/until/until.service";

@Component({
  selector: "app-shop-order-finish",
  templateUrl: "./shop-order-finish.component.html",
  styleUrls: ["./shop-order-finish.component.scss"],
})
export class ShopOrderFinishComponent extends BaseComponent implements OnInit {
  url: string = "";
  requestParams: any = {};
  requestDataType: number = -1;
  tabs: Array<any> = [];

  constructor(private httpSev: BaseHttpService, injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
    let path = this.httpSev.path;
    this.url = path.baseUrl + path.getData;
    this.requestParams = {
      resid: 580816827924,
      pageIndex: 0,
      pageSize: 10,
      getcolumninfo: 1,
    };
    this.tabs = [
      {
        isSubForm: false,
        formName: "default",
      },
    ];

    this.requestDataType = this.httpSev.dataT.HostTableDataEM;

    this.dateChangeStr = "C3_543089973094";
  }
}
