// import { Injectable } from '@angular/core'
// import { BaseHttpService } from '../../../app/base-http-service/base-http.service';
// import { NzMessageService } from 'ng-zorro-antd';

// @Injectable()
// export class CommonHttpService {
//     constructor(private _httpSev:BaseHttpService,private messageSev:NzMessageService){}

//     //获取表格中服务器定义按钮
//     getTableCustomButton(resid,obj) {
//         let path = this._httpSev.path;
//         let btnUrl = path.baseUrl + path.getButton;
//         let params = {
//             resid: this.resid
//         }
//         this._httpSev.baseRequest("GET", btnUrl, params, this._httpSev.dataT.UnKnow).subscribe(
//             (data: any) => {
//                 if (data && Array.isArray(data.data) && data.error == 0) {
//                     this._tableBtnArr = data.data;
//                 }
//             },
//             err => {
//                 this.messageSev.error('获取表格中服务器定义按钮错误');
//             }
//         )
//     }
// }