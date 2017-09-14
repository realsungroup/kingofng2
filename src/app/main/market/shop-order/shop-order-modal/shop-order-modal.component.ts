import { Component, OnInit,Input,EventEmitter } from '@angular/core';
import { BaseHttpService } from '../../../../base-http-service/base-http.service';

@Component({
  selector: 'app-shop-order-modal',
  templateUrl: './shop-order-modal.component.html',
  styleUrls: ['./shop-order-modal.component.scss']
})
export class ShopOrderModalComponent implements OnInit {

  _subData:any = {};//附表数据

  @Input() data:any = {};//主表数据

  constructor(private httpSev:BaseHttpService) { }

  ngOnInit() {

  }

  getSubData(){
    let url = this.httpSev.path.baseUrl + this.httpSev.path.getData;
    let params = {
      resid:this.data['RES_ID'],
      subresid:'',
      hostrecid:this.data['REC_ID']
    }
    this.httpSev.baseRequest("GET",url,params,this.httpSev.dataT.AttachTableDataEM).subscribe(
      data => {
        if(data){
          if(data.error == 0){
            this._subData = data['data'];
          }else alert("错误");
        }
      },
      err => {
        alert("请求失败");
      }
    )
  }

}
