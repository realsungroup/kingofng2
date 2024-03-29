/*
  name:通用表格
  date:2017-9-1
*/
import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
  OnChanges,
  ViewChild,
} from "@angular/core";
import { BaseHttpService } from "../../../app/base-http-service/base-http.service";
import { Observable } from "rxjs";
import { LZTab } from "../interface/tab.interface";
import { NzMessageService, NzModalService } from "ng-zorro-antd";

@Component({
  selector: "app-lzcommon-table",
  templateUrl: "./lzcommon-table.component.html",
  styleUrls: ["./lzcommon-table.component.scss"],
})
export class LZcommonTableComponent implements OnInit, OnChanges {
  _cmswhere: string = "";
  _menuRecordStr: string = "MenuRecordCustEdit"; //自定义按钮传递到服务器的name数据
  _theModalName: string = "main"; //弹出窗体的控制变量
  titleArr: Array<any>; //cmscolumninfo数据
  _selectData: any; //操作，详情选择的某个数据
  searchValue: string = ""; //搜索框数据
  isMainData: boolean = true; //是否为主表数据

  _filterData: Array<any> = []; //下拉菜单数据
  _filterSelectObj: any = {}; //下拉菜单选择的对象
  _tableBtnArr: Array<any> = []; //表格后台自定义按钮

  //公共参数
  @Input() alertModal: boolean = false;
  @Input() serchEnable: boolean = true;
  @Input() extraColumn: Array<any> = []; // 额外的列 [{text:'',id:'',inputComponent:'Input'}]
  @Input() isExport: boolean = false;
  @Input() isAutoData: boolean = true; //是否自动获取数据
  @Input() isAttachDataModal: boolean = false; //是否是附表数据
  @Input() operationButton: Array<any>; //自定义按钮对象{title:'',type:'',loading:true}
  @Output() operationBtnNoti = new EventEmitter(); //自定义按钮回调方法

  @Input() operationOrginButton: Array<boolean> = [false, false, false, false]; //详情 操作 删除 按钮显示
  @Input() tabs: Array<LZTab> = []; //窗体名称
  @Input() addFormName: string = ""; //新增数据的窗体名称
  @Input() isEditCustomPosition: boolean = false; //操作form是否自定义定位
  @Input() isAddCustomPosition: boolean = false; //添加form是否自定义定位

  @Input() filterDateCmswhere: string = ""; //时间cmswhere
  @Input() filterString: string = ""; //下拉菜单过滤字段
  @Input() filterData: Array<any> = []; //下拉菜单数据
  @Input() tableBtnStrArr: Array<string> = []; //服务器按钮组绑定字段(5个)

  // 自动获取数据(所需参数)
  @Input() requestType: string = "GET"; //获取数据的http请求方式
  @Input() requestUrl: string = ""; //获取数据的url
  @Input() requestParams: any = {}; //获取数据的参数(包含主表resid，cmswhere等参数)
  @Input() requestDataType: any = -1; //枚举dataType中某一个
  @Input() filterSelectObj: any = {};

  // 传入数据(所需参数)
  @Input() resid: string; //主表ID
  @Input() current = 0; //当前页数
  @Input() pageSize = 10; //一页pageSize条数据
  @Output() commonNotification = new EventEmitter(); //更新回调事件

  _total = 1; //数据总数
  _dataSet = []; //获取的数据数组
  _loading = true; //loading加载界面是否显示
  _btnExportLoading: boolean = false; //导出按钮loading状态

  //table header 过滤排序部分
  @Input() havTableFilter: boolean = false;
  copyData = [];
  @Input() filterColArr = []; //过滤字段数组
  @Input() sortColArr = []; //排序字段数组

  constructor(
    protected _httpSev: BaseHttpService,
    protected modalSev: NzModalService,
    protected messageSev: NzMessageService
  ) {}

  voidFunc() {
    return false;
  }

  //监听输入数据的变化（自动获取数据状态下取出current，pageSize，resid数据）
  ngOnChanges(changes: SimpleChanges) {
    let refresh = false;
    if (changes["requestParams"] && this.isAutoData) {
      this.current = this.requestParams["pageIndex"] + 1;
      this.pageSize = this.requestParams["pageSize"];
      this.resid = this.requestParams.resid;
      if (this.isAttachDataModal) {
        this.resid = this.requestParams.subResid;
      }
      this._cmswhere = this.requestParams.cmswhere || "";
      refresh = true;
    }

    if (changes["filterDateCmswhere"] && this.isAutoData) {
      refresh = true;
    }
    if (changes["filterSelectObj"] && this.isAutoData) {
      this.current = this.requestParams["pageIndex"] + 1;
      this.pageSize = this.requestParams["pageSize"];
      this.resid = this.requestParams.resid;
      if (this.isAttachDataModal) {
        this.resid = this.requestParams.subResid;
      }
      if (
        this.filterSelectObj == null ||
        this.filterSelectObj == undefined ||
        this.filterSelectObj == "" ||
        this.filterSelectObj == "N"
      ) {
        this._cmswhere = this.requestParams.cmswhere || "";
      } else {
        if (this.filterSelectObj === "已上架") {
          this.filterSelectObj = "N";
          this.filterString = "C3_560942986614";
        } else {
          this.filterSelectObj = "Y";
          this.filterString = "C3_560942986614";
        }
        this._cmswhere = "C3_560942986614='" + this.filterSelectObj + "'";
      }
      refresh = true;
    }

    //注释：这里是选择默认下拉列表的第一条数据

    // if (changes['filterData'] && this.isAutoData) {
    //   if (this.filterData.length) {
    //     this._filterSelectObj = this.filterData[0];

    // let tmpCmswhere = this._cmswhere;
    // if (tmpCmswhere.length) tmpCmswhere += "AND";
    // tmpCmswhere += this.filterDateCmswhere;
    //     refresh = true;
    //   }
    // }
    if (refresh) {
      this._refreshData();
      this._theModalName = "main";
    }
  }

  ngOnInit() {
    this.getTableCustomButton();
  }

  //获取cmswhere （resquestparam中cmswhere + 下拉菜单 + 传入的cmswhere（日期段等））
  getCmswhere(): string {
    let tmpCmswhere = this._cmswhere;
    if (
      Object.keys(this._filterSelectObj).length &&
      this._filterSelectObj.value.length &&
      this.filterString
    ) {
      if (tmpCmswhere.length) tmpCmswhere += " AND ";
      tmpCmswhere +=
        this.filterString + "='" + this._filterSelectObj["value"] + "'";
    }
    if (this.filterDateCmswhere.length) {
      if (tmpCmswhere.length) tmpCmswhere += " AND ";
      tmpCmswhere += this.filterDateCmswhere;
    }
    return tmpCmswhere;
  }

  //获取数据
  _refreshData() {
    //自动取数据
    if (this.isAutoData) {
      this.requestParams.cmswhere = this.getCmswhere();
      this.requestParams.pageIndex = this.current - 1;
      this.requestParams.pageSize = this.pageSize;
      this.requestParams["key"] = this.searchValue;
      this._loading = true;
      //console.info("request parametter", this.requestParams)
      //附表数据
      if (this.isAttachDataModal) {
        this._httpSev
          .baseRequest(
            this.requestType,
            this.requestUrl,
            this.requestParams,
            this.requestDataType
          )
          .subscribe(
            (data) => {
              if (data && Array.isArray(data["data"])) {
                this._dataSet = data["data"];
                this._total = data["total"];
              } else {
                this._dataSet = [];
                this._total = 0;
              }
              this.copyData = [...this._dataSet];
            },
            (error) => {
              this.messageSev.error("获取数据失败");
              this._loading = false;
            },
            () => {
              this._loading = false;
            }
          );

        let url =
          this._httpSev.path.baseUrl + this._httpSev.path.getColumnsDefine;
        let param = {
          resid: this.requestParams["subResid"],
        };
        this._httpSev.baseRequest("GET", url, param, -1).subscribe(
          (data) => {
            //console.info(data)
            if (data && data.Error == 0) {
              let tmpTitleArr = [];
              let keys = Object.keys(data["data"]);
              for (let i = 0; i < keys.length; i++) {
                let key = keys[i];
                let element = data["data"][key];
                tmpTitleArr.push({
                  id: element["ColName"],
                  text: element["ColDispName"],
                });
              }
              this.titleArr = tmpTitleArr;
            }
          },
          (err) => {}
        );
      } else {
        //主表数据
        this._httpSev
          .baseRequest(
            this.requestType,
            this.requestUrl,
            this.requestParams,
            this.requestDataType
          )
          .subscribe(
            (data) => {
              if (data && data.error == 0) {
                this.titleArr = data["cmscolumninfo"].concat(this.extraColumn);
                this._dataSet = data["data"];
                this._total = data["total"];
              } else {
                this._dataSet = [];
                this._total = 0;
              }
              this.copyData = [...this._dataSet];
            },
            (error) => {
              this.messageSev.error("获取数据失败");
              this._loading = false;
            },
            () => {
              this._loading = false;
            }
          );
      }
    } else {
      this._loading = true;
      this.commonNotification.emit({
        //更新current，pageSize到外部，再获取数据从外部传入
        current: this.current,
        pageSize: this.pageSize,
        fun: (data: any) => {
          this._loading = false;
          this.titleArr = data["cmscolumninfo"];
          this._dataSet = data["data"];
          this._total = data["total"];
        },
      });
    }
  }

  //获取表格中服务器定义按钮
  getTableCustomButton() {
    let path = this._httpSev.path;
    let btnUrl = path.baseUrl + path.getButton;
    let params = {
      resid: this.resid,
    };
    this._httpSev
      .baseRequest("GET", btnUrl, params, this._httpSev.dataT.UnKnow)
      .subscribe(
        (data: any) => {
          if (data && Array.isArray(data.data) && data.error == 0) {
            this._tableBtnArr = data.data;
          }
        },
        (err) => {
          this.messageSev.error("获取表格中服务器定义按钮错误");
        }
      );
  }

  /***********tbody按钮回调************** */
  orginBtnClick(note) {
    const event = note.$event;
    const index = note.index;
    const data = note.data;
    const idx = note.dataIndex;
    switch (index) {
      case 0:
        this.detailClick(event, data, idx);
        break;
      case 1:
        this.operationClick(event, data, idx);
        break;
      case 2:
        this.attachTableClick(event, data, idx);
        break;
      case 3:
        this.deleteClick(data);
    }
  }

  customBtnClick(note) {
    const event = note.$event;
    const index = note.i;
    const data = note.data;
    this.btnClick(event, index, data);
  }

  serveBtnClick(note) {
    const event = note.$event;
    const btnI = note.btnI;
    const btn = note.btn;
    const dataIndex = note.dataIndex;
    this.tableBtnMenuClick(event, btnI, btn, dataIndex);
  }

  /***********按钮及输入框触发事件**************/
  //后台导出文件下载
  exportXls() {
    let path = this._httpSev.path;
    let url = path.baseUrl + path.exportXls;
    this._btnExportLoading = true;
    this._httpSev
      .baseRequest(
        "GET",
        url,
        { resid: this.resid, cmswhere: this.getCmswhere() },
        this._httpSev.dataT.UnKnow
      )
      .subscribe(
        (data) => {
          if (data && data.data) {
            let fileUrl = path.fileUrl + data.data;
            window.open(fileUrl);
          }
        },
        (err) => {
          alert(JSON.stringify(err));
        },
        () => {
          this._btnExportLoading = false;
        }
      );
  }

  //下拉菜单事件
  filterClick(event: any, filterObj: any) {
    this._filterSelectObj = filterObj;
    this._refreshData();
  }

  //输入框监听事件
  searchChange(val) {
    this._refreshData();
  }

  //新增事件
  addDataClick() {
    this._theModalName = "addDataForm";
  }

  //详情事件
  detailClick(event, data, idx) {
    this._theModalName = "form-readonly";
    this._selectData = Object.assign({}, data, { idx: idx });
  }

  //操作事件
  operationClick(event, data, idx) {
    this._theModalName = "form";
    this._selectData = Object.assign({}, data, { idx: idx }); //options : [{label:"label1",value:"value1"},{label:"label2",value:"value2"}]
    this.isMainData = true;
  }

  //附表事件
  attachTableClick(event, data, idx) {
    this._theModalName = "form";
    this._selectData = Object.assign({}, data, { idx: idx });
    this.isMainData = false;
  }

  //删除事件
  deleteClick(data) {
    this.modalSev.open({
      title: "警告",
      content: "确认删除此条信息",
      onOk: () => {
        let path: any = this._httpSev.appConfig["path"];
        let url: string = path.baseUrl + path.saveData;
        let params: any = {
          resid: this.resid,
          data: data,
        };
        this._loading = true;
        this._httpSev
          .baseRequest("POST", url, params, this._httpSev.dataT.DeleteOneDataEM)
          .subscribe(
            (data) => {
              if (data) {
                if (data["error"] == 0) {
                  this._refreshData();
                } else {
                  this.messageSev.error(data["message"]);
                }
              }
            },
            (error) => {
              this.messageSev.error(JSON.stringify(error));
            },
            () => {
              this._loading = false;
            }
          );
      },
    });
  }

  //自定义按钮事件
  btnClick(event, i: number, data: any) {
    this.operationBtnNoti.emit({
      i: i,
      data: data,
      refreshData: this._refreshData.bind(this),
    });
  }

  //表格后台按钮组事件
  tableBtnMenuClick(event, i, btnObj, dataIndex) {
    let selectTabledata = this._dataSet[dataIndex];
    let path = this._httpSev.path;
    let dealBtnUrl = path.baseUrl + path.dealButton;
    let params = {
      resid: this.resid,
      recids: selectTabledata["REC_ID"],
      strCommand: btnObj["MenuCmd"],
    };

    this.modalSev.open({
      title: "提示",
      content: btnObj["ConfirmMsgCn"],
      onOk: () => {
        this._loading = true;
        if (this.filterSelectObj === "N" || this.filterSelectObj === "Y") {
          this.current = this.requestParams["pageIndex"] + 1;
          this.pageSize = this.requestParams["pageSize"];
          this.resid = this.requestParams.resid;
          if (this.isAttachDataModal) {
            this.resid = this.requestParams.subResid;
          }
          if (
            this.filterSelectObj == null ||
            this.filterSelectObj == undefined ||
            this.filterSelectObj == "" ||
            this.filterSelectObj == "N"
          ) {
            this._cmswhere = this.requestParams.cmswhere || "";
          } else {
            if (this.filterSelectObj === "已上架") {
              this.filterSelectObj = "N";
              this.filterString = "C3_560942986614";
            } else {
              this.filterSelectObj = "Y";
              this.filterString = "C3_560942986614";
            }
            this._cmswhere = "C3_560942986614='" + this.filterSelectObj + "'";
          }

          this._httpSev
            .baseRequest("GET", dealBtnUrl, params, this._httpSev.dataT.UnKnow)
            .subscribe((data: any) => {
              if (
                Array.isArray(data.data) &&
                (<Array<any>>data.data).length &&
                data.error == 0
              ) {
                this.messageSev.success(btnObj["OkMsgCn"]);
                this._refreshData();
              }
            });
        } else {
          this._httpSev
            .baseRequest("GET", dealBtnUrl, params, this._httpSev.dataT.UnKnow)
            .subscribe(
              (data: any) => {
                if (!data) return;
                if (
                  Array.isArray(data.data) &&
                  (<Array<any>>data.data).length &&
                  data.error == 0
                ) {
                  this.messageSev.success(btnObj["OkMsgCn"]);
                  this._dataSet[dataIndex] = data.data[0];
                } else {
                  this.messageSev.error(data["message"]);
                }
              },
              (err) => {
                this.messageSev.error("操作错误！");
              },
              () => {
                this._loading = false;
              }
            );
        }
      },
    });
  }

  /***********窗体通知事件**************/

  //详情窗体返回事件
  windowModalNoti() {
    this._theModalName = "main";
  }

  //编辑表单窗体回调事件
  modalFormNoti(notiObj: any) {
    if (notiObj && notiObj.name == "close") {
      this.windowModalNoti();
    } else if (notiObj && notiObj.name == "update") {
      //刷新更新
      this.windowModalNoti();
      this._refreshData();
    } else if (
      notiObj &&
      notiObj.name == "update" &&
      notiObj.data &&
      notiObj.data.idx >= 0
    ) {
      //本地更新（未用）
    }
  }

  /********组件代理******* */
  //table filter 筛选 排序更新事件
  tableFilterUpdateData(data) {
    this._dataSet = data;
  }

  alertModalEM() {
    this.windowModalNoti();
  }
}
