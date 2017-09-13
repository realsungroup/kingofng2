import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AppService } from '../../../app.service';
import { dataType } from '../../../enum/http.enum';
import { LZTab } from '../../../../lib/lzTableComponent/interface/tab.interface';
import { MainComponent } from '../../main.component';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from '../../main.service';

@Component({
  selector: 'app-applied',
  templateUrl: './applied.component.html',
  styleUrls: ['./applied.component.scss']
})
export class AppliedComponent implements OnInit {
  url: string;
  params: any;
  dataT: dataType;
  tabsArr: Array<LZTab>;
  operationButtonTitle: Array<any>;

  constructor(private appSev: AppService, protected router: Router, private route: ActivatedRoute, private mainSev: MainService) {

    this.mainSev.setBreadDataWithUrl(this.appSev.getAppConfig()["routesArr"], this.router.url);

    let path = this.appSev.getAppConfig()['path'];
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

    this.operationButtonTitle = [{ title: 'btn1', type: 'primary', loading: false },
    { title: 'btn2', type: 'default', loading: false },
    { title: 'btn3', type: 'danger', loading: false }];

    // this.tabsArr = [{
    //   isSubForm: false,
    //   formName: "default",
    // }, {
    //   isSubForm: false,
    //   formName: "yy"
    // }, {
    //   isSubForm: false,
    //   formName: "add"
    // }, {
    //   isSubForm: true,
    //   formName: "default",
    //   subFormResid: "558206277343",
    //   subFormLayout: "form"
    // }]


    this.tabsArr = [{
      isSubForm: false,
      formName: "default",
    },
    {
      isSubForm: true,
      formName: "default",
      subFormResid: "558206277343",
      subFormLayout: "form"
    }]
  }

  btnClick(i) {
    alert("click index - " + i);
  }

  ngOnInit() {

  }

}
