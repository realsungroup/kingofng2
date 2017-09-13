import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BaseHttpService } from '../../../../app/base-http-service/base-http.service';
import { LZTab } from '../../interface/tab.interface';

@Component({
  selector: 'app-window-modal',
  templateUrl: './modal-form-readonly.component.html',
  styleUrls: ['./modal-form-readonly.component.scss']
})
export class WindowModalFormReadonlyComponent implements OnInit {
  path: any;

  @Output() closeNoti = new EventEmitter();

  @Input() tabs: Array<LZTab> = [];
  @Input() data: any = {};
  @Input() resid: string = '';

  constructor(private httpSev: BaseHttpService) {
    this.path = this.httpSev.path;
  }

  ngOnInit() {
    this.tabs = this.tabs.filter(item => !item.isSubForm)

    //获取每个窗体的数据
    this.tabs.forEach(item => {
      this.getKeysData(item);
    })
  }

  //获取数据
  getKeysData(tab: LZTab) {
    let urlStr: string = this.path.baseUrl + this.path.getFormDefine;
    let params: any = {
      "resid": this.resid,
      "formname": tab.formName
    }
    this.httpSev.baseRequest("GET", urlStr, params, -1).subscribe(
      data => {
        if (data && data.data && data.data.columns) {
          tab.titleArray = data.data.columns.filter(item => item.ColDispName.length);
        }
      },
      err => {
        alert("获取数据失败");
        // alert("key data fail " + JSON.stringify(err));
      }
    )
  }

  //返回事件
  close() {
    this.closeNoti.emit();
  }
}
