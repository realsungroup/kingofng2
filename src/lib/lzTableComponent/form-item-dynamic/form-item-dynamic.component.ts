/**
 * name：编辑表单中item
 */
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormItemStructEM, FormItemTypeEM } from '../enum/form-item.enum';
import { LZUntilService } from '../until/until.service';

@Component({
  selector: 'app-form-item-dynamic',
  templateUrl: './form-item-dynamic.component.html',
  styleUrls: ['./form-item-dynamic.component.scss']
})

export class FormItemDynamicComponent implements OnInit {
  selectTypeEM: FormItemTypeEM;//合并后的枚举
  formItemEM = FormItemTypeEM;

  structType: number;//数据结构
  editType: number;//框体类型

  @Input() data: any;//上页传递的data数据
  @Input() title: any;//字段数据
  @Input() index: number;//item的index
  @Output() clickNotiEvent = new EventEmitter();

  obj: any;//绑定字段

  constructor(protected ut: LZUntilService) {

  }

  ngOnInit() {
    this.structType = this.title.ColType;
    this.editType = this.title.ColValType;

    //数据结构类型对应到itemtype枚举中
    if (this.structType == FormItemStructEM.Date) {
      this.selectTypeEM = FormItemTypeEM.Date;
    } else if (this.structType == FormItemStructEM.Time) {
      this.selectTypeEM = FormItemTypeEM.Time;
    }else if(this.structType == FormItemStructEM.LongText){
      this.selectTypeEM = FormItemTypeEM.LongText;
    } else {
      this.selectTypeEM = this.editType;
    }

    //根据枚举初始化对应的数据
    let m = this.data[this.title['ColName']];
    if (this.selectTypeEM == FormItemTypeEM.Date || this.selectTypeEM == FormItemTypeEM.Time) {
      this.obj = new Date(m);
      if(!this.ut.isValiateDate(this.obj)) this.obj = '';
    } else if (this.selectTypeEM == FormItemTypeEM.Checkbox) {
      this.obj = m == 'Y' ? true : false;
    } else {
      this.obj = m ? m : '';
    }
  }

  //绑定字段变化事件
  modelChange(event, dataT) {
    this.obj = event;
    // console.info(event, dataT);
    let m = this.data[this.title['ColName']];
    if (this.selectTypeEM == FormItemTypeEM.Date || this.selectTypeEM == FormItemTypeEM.Time) {
      m = this.ut.transformDateToString(this.obj, 'yyyy-MM-dd hh:mm:ss');
    } else if (dataT == FormItemTypeEM.Checkbox) {
      m = this.obj ? 'Y' : 'N';
    } else m = this.obj;
    this.data[this.title['ColName']] = m;
  }

  //高级字典点击事件
  searchDataClick() {
    // console.info(this.obj, this.title['ColName']);
    this.clickNotiEvent.emit({
      name: "open",
      title: this.title
    })
  }

  //textarea行数
    textareaRows(obj:any):number{
    return Math.ceil(obj.FrmHeight / 18);
  }
}
