import { Component, OnInit, Input, ElementRef, AfterViewInit, Renderer2, ViewChild, ViewChildren, QueryList,AfterViewChecked,AfterContentChecked } from '@angular/core';
import { LZcommonTableComponent } from '../../commonTable/lzcommon-table.component';
import { BaseHttpService } from '../../../../app/base-http-service/base-http.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-common-card',
  templateUrl: './common-card.component.html',
  styleUrls: ['./common-card.component.scss'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class CommonCardComponent extends LZcommonTableComponent implements OnInit, AfterViewInit,AfterViewChecked,AfterContentChecked {
  colNum: number;//几列
  navtiveEle: any;
  colSumHeight: any = [0];//每列高度数组
  _cardContainerHeight: number = 500;//卡片背景高度
  @Input() cardIndexArr: Array<number> = [];//指定字段的位置数组，第一个为图片，第二标题，第三描述

  @ViewChild('cardContainer') cardContainer: ElementRef;
  @ViewChildren('card') things: QueryList<any>;//卡片dom数组

  constructor(_httpSev: BaseHttpService, modalSev: NzModalService, messageSev: NzMessageService, private el: ElementRef, private render2: Renderer2) {
    super(_httpSev, modalSev, messageSev);
    this.navtiveEle = this.el.nativeElement;
  }

  ngAfterViewInit() {
    //监听卡片的变化(切换pagesize容易混乱，暂先注释掉)
    // this.things.changes.subscribe(
    //   data => {
    //     console.log("things loadover");
    //     console.info(data);
    //     // this.layout();
    //   }
    // )
  }

  ngAfterContentChecked(){
    //console.info("card component AfterContentChecked");
  }

  ngAfterViewChecked(){
    //console.info("card component AfterViewChecked");
  }

  layout() { //console.log("card layout")
    const cardW = 245;
    let nzCardEle = this.cardContainer.nativeElement;
    let cardContainerWidth = nzCardEle.offsetWidth;
    this.colNum = Math.floor(cardContainerWidth / cardW);
    if(this.colNum == 0) this.colNum = 1;

    this.colSumHeight = [];
    for (var i = 0; i < this.colNum; i++) {
      this.colSumHeight.push(0);
    }

    let cardEleArr = this.navtiveEle.querySelectorAll('.card'); 
    cardEleArr = Object.keys(cardEleArr).map(key => cardEleArr[key]);
    // console.info("cardelearr", cardEleArr, typeof (cardEleArr), Array.isArray(cardEleArr));
    cardEleArr.forEach(element => {

      let idx = 0,
          minSumHeight = this.colSumHeight[0];
      // 获取到solSumHeight中的最小高度
      for (var i = 0; i < this.colSumHeight.length; i++) {
        if (minSumHeight > this.colSumHeight[i]) {
          minSumHeight = this.colSumHeight[i];
          idx = i;
        }
      }
      // if(element.style.left != cardW * idx + 'px') this.render2.setStyle(element, 'left', cardW * idx + 'px'); 
      // if(element.style.top != minSumHeight + 'px') this.render2.setStyle(element, 'top', minSumHeight + 'px');
      // if(element.style.display != 'block') this.render2.setStyle(element, 'display', 'block');
      this.render2.setStyle(element, 'left', cardW * idx + 'px'); 
      this.render2.setStyle(element, 'top', minSumHeight + 'px');
      this.render2.setStyle(element, 'display', 'block'); 
      
      // 更新solSumHeight
      this.colSumHeight[idx] = this.colSumHeight[idx] + element.offsetHeight;
    });
    this.cardContainerHeight();
  }

  // 窗口调整
  onResize() { 
    this.layout();
  }

  // img加载完
  imgLoad(card) { //console.log("img load" + card)
    this.layout();
  }

  //服务器按钮加载完成
  btnLoadOver = () => {
    this.layout();
  }

  // 获取对应的key
  getTitleKey(idx): string {
    if (Array.isArray(this.cardIndexArr) && this.cardIndexArr.length)
      return this.titleArr[this.cardIndexArr[idx]]["id"];
    else
      return '';
  }

  // 计算卡片背景的高度（动态）
  cardContainerHeight() {
    setTimeout(() => {
      this._cardContainerHeight = Math.max.apply(Math, this.colSumHeight) + 60;
    });
  }
}
