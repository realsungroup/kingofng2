/**
 * name：编辑表单中item
 */
import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormItemStructEM, FormItemTypeEM, FormItemElementEM } from '../../enum/form-item.enum';
import { LZUntilService } from '../../until/until.service';
import { BaseHttpService } from '../../../../app/base-http-service/base-http.service';

@Component({
  selector: 'app-form-item-dynamic',
  templateUrl: './form-item-dynamic.component.html',
  styleUrls: ['./form-item-dynamic.component.scss']
})

export class FormItemDynamicComponent implements OnInit, OnChanges {
  selectTypeEM: FormItemTypeEM;//合并后的枚举
  formItemEM = FormItemTypeEM;
  webCamera = false;//拍照
  structType: number;//数据结构(优先级 2)
  editType: number;//框体类型(优先级 3)
  frmFieldFormType: number;//图片一些显示控件(优先级 1)

  @Input() nSpan = 12;
  @Input() data: any;//上页传递的data数据
  @Input() title: any;//字段数据
  @Input() index: number;//item的index
  @Output() updateNotiEvent = new EventEmitter();
  @Output() clickNotiEvent = new EventEmitter();

  obj: any;//绑定字段

  constructor(protected ut: LZUntilService, private httpSev: BaseHttpService) {

  }

  ngOnChanges(change: SimpleChanges) {
    if (change['data']) {
      this.initData();
    }
  }

  ngOnInit() {
    // console.log("this title title.FrmReadonly" + this.title.FrmReadonly);
  }

  initData() {
    this.structType = this.title.ColType;
    this.editType = this.title.ColValType;
    this.frmFieldFormType = this.title.FrmFieldFormType;

    //数据结构类型对应到itemtype枚举中
    if (this.frmFieldFormType == FormItemElementEM.ImageForUrlCol) {
      this.selectTypeEM = FormItemTypeEM.ImageForUrlCol;
    } else if(this.frmFieldFormType == FormItemElementEM.ImageForInputform){
      this.selectTypeEM = FormItemTypeEM.ImgCamera;
    } else if (this.structType == FormItemStructEM.Date) {
      this.selectTypeEM = FormItemTypeEM.Date;
    } else if (this.structType == FormItemStructEM.Time) {
      this.selectTypeEM = FormItemTypeEM.Time;
    } else if (this.structType == FormItemStructEM.LongText) {
      this.selectTypeEM = FormItemTypeEM.LongText;
    } else {
      this.selectTypeEM = this.editType;
    }

    //根据枚举初始化对应的数据
    let m = this.data[this.title['ColName']];
    // if (this.selectTypeEM == FormItemTypeEM.ImageForUrlCol) {
    //   let p = this.title['lzImgUrl'];
    //   this.obj = this.data[p];//alert(this.obj);
    // } else
    if (this.selectTypeEM == FormItemTypeEM.Date || this.selectTypeEM == FormItemTypeEM.Time) {
      this.obj = '';
      if (m) {
        this.obj = new Date(m);
        if (!this.ut.isValiateDate(this.obj)) this.obj = '';
      }
    } else if (this.selectTypeEM == FormItemTypeEM.Checkbox) {
      this.obj = m == 'Y' ? true : false;
    } else {
      this.obj = m;
    }
  }

  //绑定字段变化事件
  modelChange(event, dataT) {
    this.obj = event;
    // console.info(event, dataT, this.title['ColName']);
    if (this.selectTypeEM == FormItemTypeEM.Date || this.selectTypeEM == FormItemTypeEM.Time) {
      this.data[this.title['ColName']] = this.ut.transformDateToString(this.obj, 'yyyy-MM-dd hh:mm:ss');
    } else if (dataT == FormItemTypeEM.Checkbox) {
      this.data[this.title['ColName']] = this.obj ? 'Y' : 'N';
    } else this.data[this.title['ColName']] = this.obj;
  }

  //高级字典点击事件
  searchDataClick() {
    this.clickNotiEvent.emit({
      name: "open",
      title: this.title
    })
  }

  //文件（图片)选择
  imgSelectClick(event) {
    let src, url = window.URL, files = event.target.files;
    let upUrlStr = this.httpSev.path.uploadFileUrl + '?savepath=c:\\web\\web\\rispweb\\upfiles&httppath=' + this.httpSev.path.httppath;
    for (let i = 0, len = files.length; i < len; ++i) {
      let file = files[i];
      this.httpSev.updateImg(file).then(
        value => {
          this.updateAndDetailFile(value);
        }
      )
    }
  }

  updateAndDetailFile(value) {
    this.obj = value;
    this.data[this.title['ColName']] = this.obj;
    this.updateNotiEvent.emit({
      data: this.data
    });
  }

  cameraClick() {
    this.webCamera = true;
  }

  cameraImgEM(img) {
    // console.info(img);
    if (img) {
      this.httpSev.updateImgOfBase64(img).then(
        value => {
          this.updateAndDetailFile(value);
          this.webCamera = false;
        }
      )
    }
  }

  //textarea行数
  textareaRows(obj: any): number {
    return Math.ceil(obj.FrmHeight / 18);
  }
}
