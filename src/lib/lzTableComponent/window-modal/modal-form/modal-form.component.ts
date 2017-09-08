import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BaseHttpService } from '../../../../app/base-http-service/base-http.service';
import { Observable } from 'rxjs';
import { LZTab } from '../../interface/tab.interface';
import { LZUntilService } from '../../until/until.service';
import { FormItemElementEM } from '../../enum/form-item.enum';
import {trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate(300)
      ]),
      transition(':leave', [
        animate(300, style({ transform: 'translateX(-100%)' }))
      ])
    ]),


  
  ]

})
export class ModalFormComponent implements OnInit {
  enterOrBack:boolean = true;

  _theMainModal: boolean = true;//是否打开formresource组件（false为打开）
  path: any;//appConfig中路径
  advDictionaryListData: any;//传递给formresource组件的数据

  @Input() isMainData: boolean = false;//是否是主表数据
  @Input() isCustomPosition: boolean = false;//是否组件自定义定位
  @Input() tabs: Array<LZTab> = [];//标签数据，获取标题数据后添加进去
  @Input() data: any = {};//单个data数据
  @Input() resid: string = '';//主表ID
  @Output() eventNoti = new EventEmitter();//与lzcommontable组件通信

  constructor(protected httpSev: BaseHttpService, protected ut: LZUntilService) {
    this.path = this.httpSev.path;
  }

  //初始化获取每个窗体的数据
  ngOnInit() {
    this.tabs.forEach(item => {
      item.dataArray = [];
    })

    if (this.isMainData) this.tabs = this.tabs.filter(item => !item.isSubForm)
    else {
      this.tabs = this.tabs.filter(item => item.isSubForm);

      this.tabs.forEach(item => {
        this.getSubData(this.resid, item.subFormResid, this.data.REC_ID).subscribe(
          data => {
            if (data && data.data) {
              item.dataArray = data.data;
            }
          },
          err => {
            alert("获取附表数据失败");
          }
        )
      })
    }

    this.tabs.forEach(item => {
      this.getKeysData(item, item.subFormResid ? item.subFormResid : this.resid);
    })
  }

  //获取窗体的数据
  getKeysData(tab: LZTab, resid: string) {
    this.getData(tab.formName, resid).subscribe(
      data => {
        if (data && data.data && data.data.columns) {
          //筛选出字段类型数据
          tab.titleArray = data.data.columns.filter(item => item.ColName && item.ColName.length);
          //筛选出标题类型数据
          tab.titleElementArray = data.data.columns.filter(item => item.FrmFieldFormType == FormItemElementEM.Label);
          //form高度(absolute定位不会撑起父元素高度)
          tab.formHeight = data.data.columns.filter(item => item.FrmFieldFormType == FormItemElementEM.FormSelf)[0]["FrmHeight"];
          // alert(tab.formHeight);
        }
      },
      err => {
        // console.error(JSON.stringify(err));
      }
    )
  }

  getData(formName: string, resid: string) {
    let urlStr: string = this.path.baseUrl + this.path.getFormDefine;
    let params: any = {
      "resid": resid,//id
      "formname": formName//窗体名
    }
    return this.httpSev.baseRequest("GET", urlStr, params, -1);
  }

  getSubData(resid: string, subResid: string, recID?: any) {
    let urlStr: string = this.path.baseUrl + this.path.getSubData;
    let params: any = {
      "resid": resid,//id
      "subresid": subResid,
      "hostrecid": recID
    }
    return this.httpSev.baseRequest("GET", urlStr, params, this.httpSev.dataT.AttachTableDataEM);
  }

  /**********事件类*** */

  //返回点击事件
  goBack() {
    this.enterOrBack = !this.enterOrBack;
    this.eventNoti.emit({ name: "close" });
  }

  //提交事件(主表)
  submitClick() {
    let url = this.path.baseUrl + this.path.saveData;
    let params = {
      resid: this.resid,
      data: this.data
    }

    this.httpSev.baseRequest("POST", url, params, this.httpSev.dataT.FixOneDataEM).subscribe(
      data => {
        this.eventNoti.emit({ name: "update", data: this.data });//通知父组件更新数据
        // alert("save success" + JSON.stringify(data));
      },
      err => {
        console.error("save fail " + JSON.stringify(err));
      }
    )
  }

  //提交事件(附表)
  attachTableSubmitClick(tab?: LZTab) {
    let url = this.path.baseUrl + this.path.saveData;
    let params = {
      hostresid: this.resid,
      hostrecid: this.data.REC_ID,
      resid: tab.subFormResid,
      data: {
        add: tab.dataArray.filter(item => !item.REC_ID),
        fix: tab.dataArray.filter(item => item.REC_ID)
      }
    }

    this.httpSev.baseRequest("POST", url, params, this.httpSev.dataT.AddMoreAndFixMore).subscribe(
      data => {
        // this.eventNoti.emit({ name: "update", data: this.data });//通知父组件更新数据
        // alert("save success" + JSON.stringify(data));
      },
      err => {
        console.error("save fail " + JSON.stringify(err));
      }
    )

  }

  //添加form
  addField(event, tab: LZTab) {
    tab.dataArray.push({});
  }

  //删除form事件
  removeField(event, tab: LZTab, subData) {
    if (!subData.REC_ID || !subData.REC_ID.length) {
      const index = tab.dataArray.indexOf(subData);
      if (index >= 0) tab.dataArray.splice(index, 1);
    }

    subData.loading = true;

    const urlStr = this.path.baseUrl + this.path.saveData;
    let params = {
      "resid": tab.subFormResid,//id
      "data": subData
    }

    console.info(params, urlStr)
    this.httpSev.baseRequest("POST", urlStr, params, this.httpSev.dataT.DeleteOneDataEM).subscribe(
      data => {
        if (data.error == 0) {
          alert(JSON.stringify(data));
          const index = tab.dataArray.indexOf(subData);
          if (index >= 0) tab.dataArray.splice(index, 1);
        }
      },
      err => {
        alert(JSON.stringify(err));
      },
      () => {
        subData.loading = false;
      });
  }

  /*-------------子组件回调---------------*/
  formItemDynamicClick(note) {
    //打开formitemresource 组件
    let title = note['title'];
    this._theMainModal = false;
    this.advDictionaryListData = title.AdvDictionaryListData;
  }

  formItemResourceNoti(note: any) {
    if (note['name'] == 'close') this._theMainModal = true;
    else if (note['name'] == 'select') {//高级字典选择返回数据
      let data = note['data'];
      let title = note['title'];
      title = title.filter(item => item.CDZ2_TYPE == 0)//过滤字段，为1的不能匹配
      title.forEach(element => {
        let tmpData = Object.assign({}, this.data);
        tmpData[element.CDZ2_COL1] = data[element.CDZ2_COL2];
        this.data = tmpData;
        // console.info("字段" + element.CDZ2_COL2 + "匹配到" + element.CDZ2_COL1);
      });
      this._theMainModal = true;
    }
  }

  //自定义定位
  customStyle(obj: any): any {
    return this.ut.customStyle(obj);
  }
}
