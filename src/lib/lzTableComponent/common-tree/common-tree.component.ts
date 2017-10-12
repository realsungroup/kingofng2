import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { BaseHttpService } from '../../../app/base-http-service/base-http.service';

@Component({
  selector: 'app-common-tree',
  templateUrl: './common-tree.component.html',
  styleUrls: ['./common-tree.component.scss']
})
export class CommonTreeComponent implements OnInit {

  @Input() requestType:string = 'GET';
  @Input() requestParams:any = {};
  @Input() requestUrl:string = '';
  @Input() requestDataType:number = -1;

  @Input() tableRequestParam:any = {};

  @Input() rootNodeTitle:string = '';
  @Output() updateRequestParamsEvent = new EventEmitter();

  cmswhereOrgin = '';
  options: any = {};
  nodes :any[] = [];

  onStateChangeEvent(ev: any) {
    
    if(ev && ev.node && ev.node.data && ev.node.data['REC_ID']){
      this.tableRequestParam.hostrecid = ev.node.data['REC_ID'];
    }else{
       this.tableRequestParam.hostrecid = '';
    }
    this.updateRequestParamsEvent.emit(Object.assign({},this.tableRequestParam));
  }

  constructor(private httpSev: BaseHttpService) { }

  ngOnInit() {
    this.cmswhereOrgin = this.requestParams.cmswhere;
    this.nodes = [
      {
        id: 0,
        name: this.rootNodeTitle,
        hasChildren: true
      }
    ]

    //懒加载树节点
    this.options.getChildren = (node: any) => {
      const path = this.httpSev.path;
      let url = path.baseUrl + path.getData;
      return new Promise((resolve, reject) => {
        this.requestParams.cmswhere = this.cmswhereOrgin + node.id;
        this.httpSev.baseRequest(this.requestType, this.requestUrl, this.requestParams, this.requestDataType)
          .subscribe(
          data => {
            if (data && data.error == 0 && Array.isArray(data.data)) {
              <Array<any>>data.data.forEach(element => {
                element.hasChildren = true;
              });
              resolve(data.data)
            }
          },
          err => {
            reject(err);
          })
      })
    }
  }
}
