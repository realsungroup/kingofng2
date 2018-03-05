import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LZcommonTableComponent } from '../../commonTable/lzcommon-table.component';
import { ADD, MODIF, REMOVE } from './data-state.config';

@Component({
  selector: 'common-local-data',
  templateUrl: './common-local-data.component.html',
  styleUrls: ['./common-local-data.component.scss']
})
export class CommonLocalDataComponent extends LZcommonTableComponent implements OnInit {

  _ld_copyData = [];
  _modifyDataMap = {
    add: [],
    mod: [],
    del: []
  };
  _delArr = [];
  @Input() set ldData(value) {
    if (Array.isArray(value)) this._dataSet = value;
    this._ld_copyData = [...this._dataSet];
  }
  @Output() updateEM = new EventEmitter();

  ngOnInit() {
    super.ngOnInit()

    let url = this._httpSev.path.baseUrl + this._httpSev.path.getColumnsDefine;
    let param = {
      resid: this.resid
    }
    this._httpSev.baseRequest("GET", url, param, -1).subscribe(
      data => {
        //console.info(data)
        if (data && data.Error == 0) {
          let tmpTitleArr = [];
          let keys = Object.keys(data['data']);
          for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            let element = data['data'][key];
            tmpTitleArr.push({
              id: element['ColName'],
              text: element['ColDispName']
            })
          }
          this.titleArr = tmpTitleArr;
        }
      },
      err => {

      })
  }

  _refreshData() {
    this._dataSet = [...this._dataSet];
  }

  deleteClick(data, idx?) {
    this.modalSev.open({
      title: "警告",
      content: "确认删除此条信息",
      onOk: () => {
        let data = this._dataSet[idx];
        if (data._state == MODIF || !data._state) {
          data._state = REMOVE;
          this._delArr.push(data);
        }
        this._dataSet.splice(idx, 1);
        this._refreshData();
        this.sendNotificationForDatasetChange();
      }
    })
  }

  //编辑表单窗体回调事件
  modalFormNoti(notiObj: any) {
    if (notiObj && notiObj.data) {//本地更新（未用）
      let updateData = notiObj.data;
      switch (notiObj.name) {
        case 'add': {
          updateData._state = ADD
          this._dataSet.push(updateData);
          this._refreshData();
          this.windowModalNoti();
          this.sendNotificationForDatasetChange();
        }
          break;
        case 'modify': {
          const idx = notiObj.data.idx;
          updateData._state = MODIF
          this._dataSet[idx] = updateData;
          this._refreshData();
          this.windowModalNoti();
          this.sendNotificationForDatasetChange();
        }
          break;
      }

    }
  }

  sendNotificationForDatasetChange() {
    let arr = this._dataSet.filter(item => item._state == MODIF || item._state == ADD);
    arr = arr.concat(this._delArr);
    this.updateEM.emit(arr);
  }
}
