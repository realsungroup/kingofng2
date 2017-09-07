/**
 * name:高级字典资源界面
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BaseHttpService } from '../../../../app/base-http-service/base-http.service'

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
  _matchAndReferenceCols: Array<any>;

  @Input() advDictionaryListData: any;
  @Input() data: any = {};
  @Output() formItemResourceNoti = new EventEmitter();

  constructor(private httpSev: BaseHttpService) {
    this.path = this.httpSev.path;
  }

  ngOnInit() {
    this._matchAndReferenceCols = this.advDictionaryListData["0"].MatchAndReferenceCols;
  }

  //获取数据
  _refreshData() {
    let url = this.path.baseUrl + this.path.getData;
    let cmswhere = '';

    this.advDictionaryListData["0"].DictionaryFilterCol.forEach(element => {
      if (cmswhere.length) cmswhere = cmswhere + "AND";
      cmswhere = cmswhere + element.Column2 + "='" + this.data[element.Column1] + "'";
    });

    let params = {
      resid: this.advDictionaryListData["0"].ResID2,
      cmswhere: cmswhere
    }
    this._loading = true;
    this.httpSev.baseRequest("GET", url, params, this.httpSev.dataT.HostTableDataEM).subscribe(
      data => {
        this._dataSet = data['data'];
      },
      err => {
        alert("获取高级字典数据失败，错误信息：" + JSON.stringify(err));
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
