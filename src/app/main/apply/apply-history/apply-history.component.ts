import { Component, OnInit } from '@angular/core';
// import { LZcommonTableComponent } from '../../../../lib/commonTable/lzcommon-table.component';
import { ApplyHistoryService } from './apply-history.service';
import { Observable } from 'rxjs';
import { LZTab } from '../../../../lib/lzTableComponent/interface/tab.interface';

@Component({
  selector: 'app-apply-history',
  templateUrl: './apply-history.component.html',
  styleUrls: ['./apply-history.component.scss']
})
export class ApplyHistoryComponent implements OnInit {
  hsitoryTitleArr:any;
  historyDataArr:any;

  tabsArr:Array<LZTab>;

  current:any;
  pageSize:any;
  constructor(private appHistorySev:ApplyHistoryService) { 
    this.current = 1;
    this.pageSize = 2;
    this.hsitoryTitleArr = ["t1","t2"];
    this.historyDataArr = [{"d1":"v1","d2":"v1"},{"d1":"v2","d2":"v2"}]
  }

  ngOnInit() {

    this.tabsArr = [{
      formName:"default"
    },{
      formName:"yy"
    }]
  }

  getData(data){
    let cur = data['current'];
    let pageSize = data['pageSize'];
    let callBack = data['fun'];

    this.appHistorySev.getApplyHistoryData("",cur,pageSize).subscribe(
      data =>{//cmscolumninfo
        console.log(JSON.stringify(data[0]));
        console.log(JSON.stringify(data[1]));
        callBack(data)
      },
      err => {

      }
    )

  }

}
