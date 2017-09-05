/**
 * name:添加form数据页面
 */
import { Component, OnInit, Input } from '@angular/core';
import { ModalFormComponent } from '../modal-form/modal-form.component';
import { LZTab } from '../../interface/tab.interface';

@Component({
  selector: 'app-add-form-data',
  templateUrl: './add-form-data.component.html',
  styleUrls: ['./add-form-data.component.scss']
})
export class AddFormDataComponent extends ModalFormComponent implements OnInit {

  @Input() addFormName: string;//添加数据的form
  @Input() resid: string;//主表ID

  data:any = {};

  ngOnInit() {
    let tab: LZTab = {
      formName: this.addFormName
    }
    this.getKeysData(tab)
  }

}
