import { Component, OnInit, Input, ElementRef, AfterViewInit, Renderer2, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { LZcommonTableComponent } from '../../commonTable/lzcommon-table.component';
import { BaseHttpService } from '../../../../app/base-http-service/base-http.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-common-card',
  templateUrl: './common-card.component.html',
  styleUrls: ['./common-card.component.scss']
})
export class CommonCardComponent extends LZcommonTableComponent implements OnInit, AfterViewInit {
  colNum: number;
  navtiveEle: any;
  colSumHeight: any = [0];
  _cardContainerHeight: number = 500;
  @Input() cardIndexArr: Array<number> = [];

  @ViewChild('cardContainer') cardContainer: ElementRef;
  @ViewChildren('card') things: QueryList<any>;

  constructor(_httpSev: BaseHttpService, modalSev: NzModalService, messageSev: NzMessageService, private el: ElementRef, private render2: Renderer2) {
    super(_httpSev, modalSev, messageSev);
    this.navtiveEle = this.el.nativeElement;
  }

  ngAfterViewInit() {
    this.things.changes.subscribe(
      data => {
        console.log("things loadover");
        this.layout();
      }
    )
  }

  layout() {
    let nzCardEle = this.cardContainer.nativeElement;
    let cardWidth = nzCardEle.offsetWidth;
    this.colNum = Math.floor(cardWidth / 240);

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
      this.render2.setStyle(element, 'left', 240 * idx + 'px');
      this.render2.setStyle(element, 'top', minSumHeight + 'px');
      // console.info("left", 240 * idx, "top", minSumHeight, "offsetheight", element.offsetHeight);
      // 更新solSumHeight
      this.colSumHeight[idx] = this.colSumHeight[idx] + element.offsetHeight;
    });
    this.cardContainerHeight();
  }

  onResize() {
    this.layout();
  }

  imgLoad(card) {
    this.layout();
  }

  getTitleKey(idx): string {
    if (Array.isArray(this.cardIndexArr) && this.cardIndexArr.length)
      return this.titleArr[this.cardIndexArr[idx]]["id"];
    else
      return '';
  }

  cardContainerHeight() {
    this._cardContainerHeight = Math.max.apply(Math, this.colSumHeight) + 60;
  }
}
