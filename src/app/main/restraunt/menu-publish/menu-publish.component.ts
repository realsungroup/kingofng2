import { Component, OnInit, Injector, Input } from '@angular/core';
import { BaseHttpService } from '../../../base-http-service/base-http.service';
import { BaseComponent } from '../../../base-component/base.component';

@Component({
  selector: 'app-menu-publish',
  templateUrl: './menu-publish.component.html',
  styleUrls: ['./menu-publish.component.scss']
})
export class MenuPublishComponent extends BaseComponent implements OnInit {
  commonNotification: any;
 
  _filterSelectObj: any;
  url: string = '';
  tabs: Array<any> = [];
  requestParams: any = {};
  requestDataType: number = -1;

  _isPublishModalShow = false;
  isShowDate = true;
  _resid:number;
  _selectData = {};
  _publishTabs:Array<any> = [];
  filterData =[];
  _selectString={};
  
  _dataSet = [];//获取的数据数组
  _titleArr: any;//cmscolumninfo数据

  _cmswhere: string = '';
  _menuRecordStr: string = 'MenuRecordCustEdit';//自定义按钮传递到服务器的name数据
  _theModalName: string = 'main';//弹出窗体的控制变量
  titleArr: any;//cmscolumninfo数据
  searchValue: string = '';//搜索框数据
  isMainData: boolean = true;//是否为主表数据

  _filterData: Array<any> = [];//下拉菜单数据
  _tableBtnArr: Array<any> = [];//表格后台自定义按钮

  //公共参数
  @Input() alertModal:boolean = false;
  @Input() serchEnable:boolean = true;  
  @Input() isExport: boolean = false;
  @Input() isAutoData: boolean = true;//是否自动获取数据
  @Input() isAttachDataModal: boolean = false;//是否是附表数据
  @Input() operationButton: Array<any>;//自定义按钮对象{title:'',type:'',loading:true}

  @Input() operationOrginButton: Array<boolean> = [false, false, false, false];//详情 操作 删除 按钮显示 
  @Input() addFormName: string = '';//新增数据的窗体名称
  @Input() isEditCustomPosition: boolean = false;//操作form是否自定义定位
  @Input() isAddCustomPosition: boolean = false;//添加form是否自定义定位

  @Input() filterDateCmswhere: string = '';//时间cmswhere
  @Input() filterString: string = '';//下拉菜单过滤字段
  @Input() tableBtnStrArr: Array<string> = [];//服务器按钮组绑定字段(5个)

  // 自动获取数据(所需参数)
  @Input() requestType: string = "GET";//获取数据的http请求方式
  @Input() requestUrl: string = '';//获取数据的url

  // 传入数据(所需参数)
  @Input() resid: string;//主表ID
  @Input() current = 0;//当前页数
  @Input() pageSize = 10;//一页pageSize条数据

  _total = 1;//数据总数
  _loading = true;//loading加载界面是否显示
  _btnExportLoading: boolean = false;//导出按钮loading状态

  //table header 过滤排序部分
  @Input() havTableFilter: boolean = false;
  copyData = [];
  @Input() filterColArr = [];//过滤字段数组
  @Input() sortColArr = [];//排序字段数组
  
  constructor(private httpSev: BaseHttpService, injector:Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();

    let path = this.httpSev.path;
    this.url = path.baseUrl + path.getData;
    this.requestParams = {
      resid: 530889813533,
      pageIndex: 0,
      pageSize: 10,
      getcolumninfo: 1
    }
    this.requestDataType = this.httpSev.dataT.HostTableDataEM;
    this.tabs = [{
      isSubForm: false,
      formName: "default",
    }]

    this.dateChangeStr = 'C3_529015275277';

    let urlStr: string = path.baseUrl + path.getFormDefine;
    this.filterData.push("已上架");
    this.filterData.push("已下架");
    
    }
  modalFormNoti() {
    this._isPublishModalShow = false;
  }

  //下拉菜单事件
  filterClick(event: any, filterObj: any) {
    this._filterSelectObj = filterObj;

    // this._refreshData();
  }

}
