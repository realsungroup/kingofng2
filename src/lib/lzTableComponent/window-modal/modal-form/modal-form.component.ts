import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BaseHttpService } from '../../../../app/base-http-service/base-http.service';
import { Observable } from 'rxjs';
import { LZTab } from '../../interface/tab.interface';
import { LZUntilService } from '../../until/until.service';
import { FormItemElementEM } from '../../enum/form-item.enum';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss']
})
export class ModalFormComponent implements OnInit {
  // validateForm: FormGroup;

  _theMainModal:boolean = true;//是否打开formresource组件（false为打开）
  path: any;//appConfig中路径
  advDictionaryListData:any;//传递给formresource组件的数据
  isCustomPosition:boolean = true;//是否组件自定义定位

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
      this.getKeysData(item);
    })
  }

  //获取窗体的数据
  getKeysData(tab: LZTab) {
    let urlStr: string = this.path.baseUrl + this.path.getFormDefine;
    let params: any = {
      "resid": this.resid,//id
      "formname": tab.formName//窗体名
    }
    this.httpSev.baseRequest("GET", urlStr, params, -1).subscribe(
      data => {
        if (data && data.data && data.data.columns) {
          //筛选出字段类型数据
          tab.titleArray = data.data.columns.filter(item => item.ColName && item.ColName.length);
          //筛选出标题类型数据
          tab.titleElementArray = data.data.columns.filter(item => item.FrmFieldFormType == FormItemElementEM.Label);
        }
      },
      err => {
        console.error(JSON.stringify(err));
      }
    )
  }

  //返回点击事件
  goBack() {
    this.eventNoti.emit({ name: "close" });
  }

  submitForm() {

  }

  //提交事件
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

/*-------------子组件回调---------------*/
  formItemDynamicNoti(note){
    //打开formitemresource 组件
    let title = note['title'];
    this._theMainModal = false;

    this.advDictionaryListData = title.AdvDictionaryListData; 
  }

  formItemResourceNoti(note:any){
    if(note['name'] == 'close') this._theMainModal = true;
    else if(note['name'] == 'select'){//高级字典选择返回数据
      let data = note['data'];
      let title = note['title'];
      title = title.filter(item => item.CDZ2_TYPE == 0)//过滤字段，为1的不能匹配
      title.forEach(element => {
        this.data[element.CDZ2_COL1] = data[element.CDZ2_COL2];
        console.info("字段" + element.CDZ2_COL2 + "匹配到" + element.CDZ2_COL1);
      });
      this._theMainModal = true;
    }
  }

    //自定义定位
  customStyle(obj: any):any {
    return this.ut.customStyle(obj);
  }
}
