import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LZcommonTableComponent } from '../../lib/lzTableComponent/commonTable/lzcommon-table.component';

@Component({
  selector: 'app-extend-table',
  templateUrl: '../../lib/lzTableComponent/commonTable/lzcommon-table.component.html',
  // templateUrl:'./extend-table.component.html',
  styleUrls: ['./extend-table.component.scss']
})
export class ExtendTableComponent extends LZcommonTableComponent implements OnInit {

  //详情事件
  detailClick(event, data, idx) {
    super.detailClick(event, data, idx);
  }

}
