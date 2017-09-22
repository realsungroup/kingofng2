/**
 * name:添加form数据页面
 */
import { Component, OnInit, Input } from '@angular/core';
import { ModalFormComponent } from '../modal-form/modal-form.component';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormItemElementEM } from '../../enum/form-item.enum';

@Component({
  selector: 'app-add-form-data',
  templateUrl: './add-form-data.component.html',
  styleUrls: ['./add-form-data.component.scss']
})
export class AddFormDataComponent extends ModalFormComponent implements OnInit {

  @Input() addFormName: string;//添加数据的form
  @Input() resid: string;//主表ID

  titleArray = [];
  titleElementArray = [];
  data: any = {};


  ngOnInit() {
    this.getData(this.addFormName, this.resid).subscribe(
      data => {
        this.titleArray = data.data.columns.filter(item => (item.ColName && item.ColName.length) || (item.FrmFieldFormType == FormItemElementEM.ImageForUrlCol));
        this.titleElementArray = data.data.columns.filter(item => item.FrmFieldFormType == FormItemElementEM.Label);

        let imgElementArr = data.data.columns.filter(item => item.FrmFieldFormType == FormItemElementEM.ImageForUrlCol);
        imgElementArr = this.imgElementAddColName(imgElementArr);

        this.titleArray = this.fixTitleForImgType(this.titleArray, imgElementArr);
      },
      err => {
        this.messageSev.error("获取数据失败,错误信息:"+ JSON.stringify(err));
      },
      () => {

      }
    )
  }

  submitClick() {
    let path = this.httpSev.appConfig.path;
    let urlStr = path.baseUrl + path.saveData;
    let params = {
      resid: this.resid,
      data: this.data,
      formname: this.addFormName
    }
    this.httpSev.baseRequest("POST", urlStr, params, this.httpSev.dataT.AddOneDataEM).subscribe(
      data => {
        if(data && data.error == 0)  this.eventNoti.emit({ name: "update", data: this.data });//通知父组件更新数据
        else if(data && data.error < 0) {
          this.messageSev.error(data['message'])
        }
      },
      err => {
        this.messageSev.error("添加失败");
      },
      () => {

      }
    )
  }


}
