import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LZcommonTableComponent } from '../../lib/lzTableComponent/commonTable/lzcommon-table.component';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-extend-table',
  templateUrl: '../../lib/lzTableComponent/commonTable/lzcommon-table.component.html',
  // templateUrl:'./extend-table.component.html',
  styleUrls: ['./extend-table.component.scss'],
    animations: [
    trigger('modelNameState', [
      state('main', style({
        backgroundColor: '#eee',
        transform: 'scale(1)'
      })),
      state('addDataForm',   style({
        backgroundColor: '#cfd8dc',
        transform: 'scale(1)'
      })),
      transition('* => main', animate('100ms ease-in')),
      transition('* => addDataForm', animate('100ms ease-out'))
    ])
  ]
})
export class ExtendTableComponent extends LZcommonTableComponent implements OnInit {

  //详情事件
  detailClick(event, data, idx) {
    // super.detailClick(event,data,idx);
    alert("extend detail click");
    // this._theModalName = 'form-readonly';
    // this._selectData = Object.assign({},data,{idx:idx});
  }

}
