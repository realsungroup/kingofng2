/**
 * name:高级字典资源界面
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BaseHttpService } from '../../../../app/base-http-service/base-http.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-form-item-resource',
  templateUrl: './form-item-resource.component.html',
  styleUrls: ['./form-item-resource.component.scss']
})
export class FormItemResourceComponent implements OnInit {
  path: any;
  _total = 1;
  _dataSet = [];
  _loading = true;
  current = 0;
  pageSize = 10;
  _matchAndReferenceCols: Array<any> = [];
  _dictionaryFilterCol: Array<any> = [];

  @Input() advDictionaryListData: any;
  @Input() data: any = {};
  @Output() formItemResourceNoti = new EventEmitter();

  constructor(private httpSev: BaseHttpService,private messageSev:NzMessageService) {
    this.path = this.httpSev.path;
  }

  ngOnInit() {
    let obj = this.advDictionaryListData["0"];
    if(obj && obj.MatchAndReferenceCols && Array.isArray(obj.MatchAndReferenceCols)) {
      this._matchAndReferenceCols = obj.MatchAndReferenceCols;
    }
    if(obj && obj.DictionaryFilterCol && Array.isArray(obj.DictionaryFilterCol)){
      this._dictionaryFilterCol = obj.DictionaryFilterCol;
    }
  }

  //获取数据
  _refreshData() {
    let url = this.path.baseUrl + this.path.getData;
    let cmswhere = '';

    this._dictionaryFilterCol.forEach(element => {
      if (cmswhere.length) cmswhere = cmswhere + "AND ";
      cmswhere = cmswhere + element.Column2 + "='" + this.data[element.Column1] + "'";
    });

    let resid2 = '';
    if(this.advDictionaryListData && this.advDictionaryListData["0"] && this.advDictionaryListData["0"].ResID2){
      resid2 = this.advDictionaryListData["0"].ResID2;
    }
    let params = {
      resid: resid2,
      cmswhere: cmswhere
    }
    this._loading = true;
    this.httpSev.baseRequest("GET", url, params, this.httpSev.dataT.HostTableDataEM).subscribe(
      data => {
        if(data && data.error == 0 && data['data'] && Array.isArray(data['data'])){
          this._dataSet = data['data'];
        }
      },
      err => {
        this.messageSev.error("获取高级字典数据失败，错误信息：" + JSON.stringify(err));
      },
      () => {
        this._loading = false;
      }
    )
  }

  /**********按钮事件**********/
  //选择事件 通知父组件更新数据
  tdSelect(data: any) {
    this.formItemResourceNoti.emit({
      name: 'select',
      data: data,
      title: this._matchAndReferenceCols
    });
  }

  //返回事件
  goBack() {
    this.formItemResourceNoti.emit({ name: 'close' });
  }
}
