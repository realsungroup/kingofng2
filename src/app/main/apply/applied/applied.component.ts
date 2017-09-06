import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import { dataType } from '../../../enum/http.enum';
import { LZTab } from '../../../../lib/lzTableComponent/interface/tab.interface';

@Component({
  selector: 'app-applied',
  templateUrl: './applied.component.html',
  styleUrls: ['./applied.component.scss']
})
export class AppliedComponent implements OnInit {

  url:string;
  params:any;
  dataT:dataType;
  tabsArr:Array<LZTab>;

  operationButtonTitle:Array<any>;


  constructor(private appSev:AppService) {
    let path = this.appSev.getAppConfig()['path'];
    this.url = path['baseUrl'] +  path['getData'];
    this.params = {
      'subresid': '',
      'cmswhere': '',
      'key': '',
      'pageSize':2,
      'pageIndex':0,
      'resid':'549561320087',
      'getcolumninfo':'1'
    }
    this.dataT = dataType.HostTableDataEM;

    this.operationButtonTitle = [{title:'btn1',type:'primary',loading:true},
                                 {title:'btn2',type:'default',loading:false},
                                 {title:'btn3',type:'danger',loading:false}];

    this.tabsArr = [{
      formName:"default"
    },{
      formName:"yy"
    },{
      formName:"add"
    }]
   }

   btnClick(i){
     alert("click index - " + i);
   }

  ngOnInit() {

  }

  // getData(data){
  //   let cur = data['current'];
  //   let pageSize = data['pageSize'];
  //   this.params.pageIndex = cur -1 ;
  //   this.params.pageSize = pageSize;

  // }

}
