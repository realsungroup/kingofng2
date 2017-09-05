/*
  name:通用表格
  date:2017-9-1
*/
import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter, OnChanges } from '@angular/core';
import { BaseHttpService } from '../../../app/base-http-service/base-http.service';
import { Observable } from 'rxjs';
import { dataType } from '../../../app/enum/http.enum';
import { LZTab } from '../interface/tab.interface';

@Component({
  selector: 'app-lzcommon-table',
  templateUrl: './lzcommon-table.component.html',
  styleUrls: ['./lzcommon-table.component.scss']
})
export class LZcommonTableComponent implements OnInit, OnChanges {
  _menuRecordStr: string = 'MenuRecordCustEdit';//自定义按钮传递到服务器的name数据
  _theModalName:string = 'main';//弹出窗体的控制变量
  titleArr: any;//cmscolumninfo数据
  _selectData:any;//操作，详情选择的某个数据
  searchValue:string = '';//搜索框数据


  @Input() isAutoData: boolean = false;//是否自动获取数据
  @Input() operationButton: Array<any>;//自定义按钮对象
  @Output() operationBtnNoti = new EventEmitter();//自定义按钮回调方法
  @Input() operationOrginButton :Array<boolean> = [false,false,false];//详情 操作 删除 按钮显示 
  @Input() tabs:Array<LZTab>;//窗体名称

  // 自动获取数据
  @Input() requestType: string = "GET";//获取数据的http请求方式
  @Input() requestUrl: string = '';//获取数据的url
  @Input() requestParams: any = {};//获取数据的参数(包含主表resid，cmswhere等参数)
  @Input() requestDataType: any = -1;//枚举dataType中某一个

  // 传入数据
  @Input() resid:string;//主表ID
  @Input() current;//当前页数
  @Input() pageSize;//一页pageSize条数据
  @Output() commonNotification = new EventEmitter();//回调事件（自定义按钮事件）

  _total = 1;//数据总数
  _dataSet = [];//获取的数据数组
  _loading = true;//loading加载界面是否显示

  constructor(protected _httpSev: BaseHttpService) {
     
  }

  //监听输入数据的变化（自动获取数据状态下取出current，pageSize，resid数据）
  ngOnChanges(changes: SimpleChanges) {
    if (changes['requestParams']) {
      this.current = this.requestParams['pageIndex'] + 1;
      this.pageSize = this.requestParams['pageSize'];
      this.resid = this.requestParams.resid;
    }
  }

  ngOnInit() {
    this._refreshData();//首次加载数据
  }

  //获取数据
  _refreshData = () => {
    //自动取数据
    if (this.isAutoData) {
      this.requestParams.pageIndex = this.current - 1;
      this.requestParams.pageSize = this.pageSize;
      this.requestParams['key'] = this.searchValue;
      this._loading = true;
      this._httpSev.baseRequest(this.requestType, this.requestUrl, this.requestParams, this.requestDataType).subscribe(
        data => {
          this.titleArr = data['cmscolumninfo'];
          this._dataSet = data['data'];
          this._total = data['total'];
        },
        error => {
        },
        () => {
          this._loading = false;
        }
      )

    } else {

      this._loading = true;
      this.commonNotification.emit({//更新current，pageSize到外部，再获取数据从外部传入
        "current": this.current,
        "pageSize": this.pageSize,
        "fun": (data: any) => {

          this._loading = false;
          this.titleArr = data['cmscolumninfo'];
          this._dataSet = data['data'];
          this._total = data['total'];

        }
      });
    }

  };

  /***********按钮及输入框触发事件**************/
  //输入框监听事件
  searchChange(val){
    this._refreshData();
  }

  //附表事件
  addDataClick(){
    
  }

  //详情事件
  detailClick(event,data,idx) {
    this._theModalName = 'form-readonly';
    this._selectData = Object.assign({},data,{idx:idx});
  }

  //操作事件
  operationClick(event,data,idx) {
    this._theModalName = 'form';
    this._selectData = Object.assign({},data,{idx:idx});//options : [{label:"label1",value:"value1"},{label:"label2",value:"value2"}]
  }

  //删除事件
  deleteClick(data) {
    let path:any = this._httpSev.appConfig['path'];
    let url:string = path.baseUrl + path.saveData;
    let params:any = {
      'resid':this.resid,
      'data':data
    }
    this._loading = true;
    this._httpSev.baseRequest("POST", url,params,dataType.DeleteOneDataEM).subscribe(
      data => {
        this._refreshData();
      },
      error => {
      },
      () => {
        this._loading = false;
      }
    )
  }

  //自定义按钮事件
  btnClick(event, i) {
    let name = this._menuRecordStr + i;
    this.operationBtnNoti.emit(i);

    debugger
    setTimeout(() => {
      this.operationButton[i].loading = true;
      setTimeout(() => {
        this.operationButton[i].loading = false;
      }, 2000);
    }, 2000);
  }
 
  /***********窗体通知事件**************/
  
  //详情窗体返回事件
  windowModalNoti(){
    this._theModalName = 'main';
  }

  //编辑表单窗体回调事件
  modalFormNoti(notiObj:any){
    if(notiObj && notiObj.name == 'close'){
      this.windowModalNoti();
    }else if(notiObj && notiObj.name == 'update' && notiObj.data && notiObj.data.idx >= 0){
      alert("formEditNoti refresh data")
      this.windowModalNoti();
      this._refreshData();
    }
  }

}
