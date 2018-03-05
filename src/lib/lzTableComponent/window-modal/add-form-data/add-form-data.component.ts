/**
 * name:添加form数据页面
 */
import { Component, OnInit, Input } from '@angular/core';
import { ModalFormComponent } from '../modal-form/modal-form.component';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormItemElementEM } from '../../enum/form-item.enum';
import { FormItemResourceComponent } from '../form-item-resource/form-item-resource.component';
import { FormService } from '../../service/form.service';

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
  formHeight = 0;

  ngOnInit() {
    this.getData(this.addFormName, this.resid).subscribe(
      data => {
        this.titleArray = data.data.columns.filter(item => (item.ColName && item.ColName.length) || (item.FrmFieldFormType == FormItemElementEM.ImageForUrlCol) || (item.FrmFieldFormType == FormItemElementEM.ImageForInputform));
        this.titleElementArray = data.data.columns.filter(item => item.FrmFieldFormType == FormItemElementEM.Label);

        let formSelfArr = data.data.columns.filter(item => item.FrmFieldFormType == FormItemElementEM.FormSelf);
        if (Array.isArray(formSelfArr) && formSelfArr[0]) this.formHeight = formSelfArr[0]["FrmHeight"] || 0;

        // let imgElementArr = data.data.columns.filter(item => item.FrmFieldFormType == FormItemElementEM.ImageForUrlCol);
        // imgElementArr = this.imgElementAddColName(imgElementArr);

        // this.titleArray = this.fixTitleForImgType(this.titleArray, imgElementArr);

        let specilTitleArr = [FormItemElementEM.ImageForUrlCol, FormItemElementEM.ImageForInputform];
        specilTitleArr.forEach(type => {
          let elementArr = data.data.columns.filter(item => item.FrmFieldFormType == type);
          elementArr = this.formService.elementAddColName(elementArr);
          this.titleArray = this.formService.fixTitleForType(this.titleArray, elementArr, type);
        })
      },
      err => {
        this.messageSev.error("获取数据失败,错误信息:" + JSON.stringify(err));
      },
      () => {

      }
    )
  }

  submitClick() {
    if (this.localDataState) this.eventNoti.emit({ name: "add", data: this.data });
    else {

      let path = this.httpSev.appConfig.path;
      let urlStr = path.baseUrl + path.saveData;
      let params = {
        resid: this.resid,
        data: this.data,
        formname: this.addFormName
      }
      this.httpSev.baseRequest("POST", urlStr, params, this.httpSev.dataT.AddOneDataEM).subscribe(
        data => {
          if (data && data.error == 0) this.eventNoti.emit({ name: "update", data: this.data });//通知父组件更新数据
          else if (data && data.error < 0) {
            this.messageSev.error(data['message'])
          }
        },
        err => {
          this.messageSev.error("添加失败");
        },
        () => {

        })
    }
  }


}
