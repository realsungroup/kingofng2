/**
 * name：编辑表单中item,后台数据定位界面
 */
import { Component } from '@angular/core';
import { FormItemDynamicComponent } from '../form-item-dynamic/form-item-dynamic.component';

@Component({
  selector: 'app-form-item-dynamic-p',
  templateUrl: './form-item-dynamic-p.component.html',
  styleUrls: ['../form-item-dynamic/form-item-dynamic.component.scss']
})

export class FormItemDynamicPComponent extends FormItemDynamicComponent {

  //自定义定位
  customStyle(obj: any): any {
    return this.ut.customStyle(obj);
  }

}
