import { Component, OnInit, Injector } from '@angular/core';
import { BaseHttpService } from '../../../base-http-service/base-http.service';
import { NzMessageService } from 'ng-zorro-antd';
import { BaseComponent } from '../../../base-component/base.component';

@Component({
  selector: 'app-clear-cache',
  templateUrl: './clear-cache.component.html',
  styleUrls: ['./clear-cache.component.scss']
})
export class ClearCacheComponent extends BaseComponent implements OnInit {

  constructor(injector:Injector, private httpSev:BaseHttpService,private messageSev:NzMessageService) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  clear(){
    let loading = this.messageSev.loading("清除中..."); 
    let url = this.httpSev.path.baseUrl + this.httpSev.path.clearCache;
    this.httpSev.baseRequest("GET",url,{},this.httpSev.dataT.UnKnow).subscribe(
      data => {
        this.messageSev.success("清除成功");
      },
      err => {
        this.messageSev.error("清除失败");
      },
      () => {
        this.messageSev.remove(loading.messageId);
      }
    )
  }

}
