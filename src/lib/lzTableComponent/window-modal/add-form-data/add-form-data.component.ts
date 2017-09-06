/**
 * name:添加form数据页面
 */
import { Component, OnInit, Input } from '@angular/core';
import { ModalFormComponent } from '../modal-form/modal-form.component';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-add-form-data',
  templateUrl: './add-form-data.component.html',
  styleUrls: ['./add-form-data.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate(500)
      ]),
      // transition(':leave', [
      //   animate(500, style({transform: 'translateX(0)'}))
      // ])

             transition('* => void', [
          style({transform: 'translateY(0)', opacity: 1}),
          animate('500ms', style({transform: 'translateY(100%)', opacity: 0}))
        ])

      // transition('* => void', [
      //   style({ height: '*' }),
      //   animate(250, style({ height: 0 }))
      // ])
    ])
  ]
})
export class AddFormDataComponent extends ModalFormComponent implements OnInit {

  @Input() addFormName: string;//添加数据的form
  @Input() resid: string;//主表ID

  titleArray = [];
  data: any = {};

  ngOnInit() {
    this.getData(this.addFormName).subscribe(
      data => {
        this.titleArray = data.data.columns.filter(item => item.ColName && item.ColName.length);
      },
      err => {

      },
      () => {

      }
    )
  }

  submitClick() {
    console.info(this.data, JSON.stringify(this.data));

    let path = this.httpSev.appConfig.path;
    let urlStr = path.baseUrl + path.saveData;
    let params = {
      resid: this.resid,
      data: this.data,
      formname: this.addFormName
    }
    this.httpSev.baseRequest("POST", urlStr, params, this.httpSev.dataT.AddOneDataEM).subscribe(
      data => {
        alert("add success " + JSON.stringify(data));
        this.eventNoti.emit({ name: "update", data: this.data });//通知父组件更新数据
      },
      err => {
        alert("add fail " + JSON.stringify(err));
      },
      () => {

      }
    )
  }

  //   //返回点击事件
  // goBack() {
  //   super.goBack();
  //   @flyInOut
  // }

}
