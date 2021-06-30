/**
 * name：编辑表单中item
 */
import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormItemStructEM, FormItemTypeEM, FormItemElementEM } from '../../enum/form-item.enum';
import { LZUntilService } from '../../until/until.service';
import { BaseHttpService } from '../../../../app/base-http-service/base-http.service';
 const init_options = [{
 
 }]
//   value: this.title.ListOfColOptions[0].displayColValue,
//   label: this.title.ListOfColOptions[0].displayColValue,
//   children: [{
//     value: 'hangzhou',
//     label: 'Hangzhou',
//     isLeaf: true
//   //   children: [{
//   //     value: 'xihu',
//   //     label: 'West Lake',
//   //     isLeaf: true
//   //   }],
//   // },
//   //  {
//   //   value: 'ningbo',
//   //   label: 'Ningbo',
//   //   isLeaf: true
//    }
// ],
// }, {
//   value: 'jiangsu',
//   label: 'Jiangsu',
//   children: [{
//     value: 'nanjing',
//     label: 'Nanjing',
//     isLeaf: true
//     // children: [{
//     //   value: 'zhonghuamen',
//     //   label: 'Zhong Hua Men',
//     // }],
//   }],
// }];

// const other_options = [{
//   value: 'fujian',
//   label: 'Fujian',
//   children: [{
//     value: 'xiamen',
//     label: 'Xiamen',
//     children: [{
//       value: 'Kulangsu',
//       label: 'Kulangsu',
//       isLeaf: true
//     }],
//   }],
// }, {
//   value: 'guangxi',
//   label: 'Guangxi',
//   children: [{
//     value: 'guilin',
//     label: 'Guilin',
//     children: [{
//       value: 'Lijiang',
//       label: 'Li Jiang River',
//       isLeaf: true
//     }],
//   }],
// }];

@Component({
  selector: 'app-form-item-dynamic',
  templateUrl: './form-item-dynamic.component.html',
  styleUrls: ['./form-item-dynamic.component.scss']
})


export class FormItemDynamicComponent implements OnInit, OnChanges {
  _options = null;

  _value: any[] = null;
  _console(value) {
    console.log(value);
  }
  obj1: any;
  selectTypeEM: FormItemTypeEM;//合并后的枚举
  formItemEM = FormItemTypeEM;
  webCamera = false;//拍照
  structType: number;//数据结构(优先级 2)
  editType: number;//框体类型(优先级 3)
  frmFieldFormType: number;//图片一些显示控件(优先级 1)

  @Input() nSpan = 12;
  @Input() data: any;//上页传递的data数据
  @Input() title: any;//字段数据
  @Input() index: number;//item的index
  @Output() updateNotiEvent = new EventEmitter();
  @Output() clickNotiEvent = new EventEmitter();

  obj: any;//绑定字段

  constructor(protected ut: LZUntilService, private httpSev: BaseHttpService) {

  }

  ngOnChanges(change: SimpleChanges) {
    
    if (change['data']) {
      this.initData();
    }
  }

  ngOnInit() {
    
    // alert(this.data.olD.displayColValue);
    // setTimeout(() => {
    //   this._options = init_options;
    // }, 100);
    // console.log("this title title.FrmReadonly" + this.title.FrmReadonly);
  }

  _changeNzOptions(): void {
    if (this._options === init_options) {
      // this._options = other_options;
    } else {
      this._options = init_options;
    }
  }
  
  initData() {
    var val;
    var i =0;
    var aa:[1,2,3,3,3,5,6,6];
    //var arrayObj = new Array([]);
    var arrayObj= this.title.ListOfColOptions[0]; 
    // var a = arrayObj;
    // var b = a['displayColValue'];
    // alert(b);
    //  alert(this.title.ListOfColOptions[0].displayColValue);

//     for(i = 1;i++;i<this.title.ListOfColOptions.length){
      
//      alert(arrayObj.displayColValue);
//       val = arrayObj.displayColValue; 
//       const init_options = [{
//         value: val,
//         label: val,
//         children: [{
//           value: 'hangzhou',
//           label: 'Hangzhou',
//           isLeaf: true
//         }]
//     }
   
//   ]
// }

      //   children: [{
      //     value: 'xihu',
      //     label: 'West Lake',
      //     isLeaf: true
      //   }],
      // },
      //  {
      //   value: 'ningbo',
      //   label: 'Ningbo',
      //   isLeaf: true
    // }, {
    //   value: val,
    //   label: val,
    //   children: [{
    //     value: 'nanjing',
    //     label: 'Nanjing',
    //     isLeaf: true
    //     // children: [{
    //     //   value: 'zhonghuamen',
    //     //   label: 'Zhong Hua Men',
    //     // }],
    //   }],
    // }];
     setTimeout(() => {
        this._options = init_options;
      }, 100);
    // alert(this.title.ListOfColOptions[0].displayColValue);
    this.structType = this.title.ColType;
    this.editType = this.title.ColValType;
    this.frmFieldFormType = this.title.FrmFieldFormType;

    //数据结构类型对应到itemtype枚举中
    if (this.frmFieldFormType == FormItemElementEM.ImageForUrlCol) {
      this.selectTypeEM = FormItemTypeEM.ImageForUrlCol;
    } else if(this.frmFieldFormType == FormItemElementEM.ImageForInputform){
      this.selectTypeEM = FormItemTypeEM.ImgCamera;
    } else if (this.structType == FormItemStructEM.Date) {
      this.selectTypeEM = FormItemTypeEM.Date;
    } else if (this.structType == FormItemStructEM.Time) {
      this.selectTypeEM = FormItemTypeEM.Time;
    } else if (this.structType == FormItemStructEM.LongText) {
      this.selectTypeEM = FormItemTypeEM.LongText;
    } else {
      this.selectTypeEM = this.editType;
    }
    //根据枚举初始化对应的数据
    let m = this.data[this.title['ColName']];
    let n = this.data.GcId;
    this.obj1= n;
    // if (this.selectTypeEM == FormItemTypeEM.ImageForUrlCol) {
    //   let p = this.title['lzImgUrl'];
    //   this.obj = this.data[p];//alert(this.obj);
    // } else
    if (this.selectTypeEM == FormItemTypeEM.Date || this.selectTypeEM == FormItemTypeEM.Time) {
      this.obj = '';
      if (m) {
        this.obj = new Date(m);
        if (!this.ut.isValiateDate(this.obj)) this.obj = '';
      }
    } else if (this.selectTypeEM == FormItemTypeEM.Checkbox) {
      this.obj = m == 'Y' ? true : false;
    } else {
      this.obj = m;
    }
  }

  //绑定字段变化事件
  modelChange(event, dataT) {
    this.obj = event;
    // console.info(event, dataT, this.title['ColName']);
    if (this.selectTypeEM == FormItemTypeEM.Date || this.selectTypeEM == FormItemTypeEM.Time) {
      this.data[this.title['ColName']] = this.ut.transformDateToString(this.obj, 'yyyy-MM-dd hh:mm:ss');
    } else if (dataT == FormItemTypeEM.Checkbox) {
      this.data[this.title['ColName']] = this.obj ? 'Y' : 'N';
    } else this.data[this.title['ColName']] = this.obj;
  }

  //高级字典点击事件
  searchDataClick() {
    this.clickNotiEvent.emit({
      name: "open",
      title: this.title
    })
  }

  //文件（图片)选择
  imgSelectClick(event) {
    let src, url = window.URL, files = event.target.files;
    let upUrlStr = this.httpSev.path.uploadFileUrl + '?savepath=C:\\web\\web\\rispweb\\upfiles&httppath=' + this.httpSev.path.httppath;
    for (let i = 0, len = files.length; i < len; ++i) {
      let file = files[i];
      this.httpSev.updateImg(file).then(
        value => {
          this.updateAndDetailFile(value);
        }
      )
    }
  }

  updateAndDetailFile(value) {
    this.obj = value;
    this.data[this.title['ColName']] = this.obj;
    this.updateNotiEvent.emit({
      data: this.data
    });
  }

  cameraClick() {
    this.webCamera = true;
  }

  cameraImgEM(img) {
    // console.info(img);
    if (img) {
      this.httpSev.updateImgOfBase64(img).then(
        value => {
          this.updateAndDetailFile(value);
          this.webCamera = false;
        }
      )
    }
  }

  //textarea行数
  textareaRows(obj: any): number {
    return Math.ceil(obj.FrmHeight / 18);
  }
}
