import { Component, OnInit,Input,ElementRef,AfterViewInit } from '@angular/core';
import { LZcommonTableComponent } from '../../commonTable/lzcommon-table.component';
import { BaseHttpService } from '../../../../app/base-http-service/base-http.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
declare let waterfall:any;

@Component({
  selector: 'app-common-card',
  templateUrl: './common-card.component.html',
  styleUrls: ['./common-card.component.scss']
})
export class CommonCardComponent extends LZcommonTableComponent implements OnInit,AfterViewInit {

  @Input() cardIndexArr:Array<number> = [];

  constructor( _httpSev: BaseHttpService,  modalSev: NzModalService,  messageSev: NzMessageService,private el:ElementRef) {
    super(_httpSev,modalSev,messageSev);

  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngAfterViewInit(){
    let cardEle = this.el.nativeElement.querySelector('#card');
    console.info("cardEle",cardEle);
    waterfall(cardEle);
  }

  getTitleKey(idx){
    return this.titleArr[this.cardIndexArr[idx]]["id"];
  }

  gridStyle = {
    width: '25%',
    textAlign: 'center',
  }

  _refreshData111(){
    alert("111");
  }

}
