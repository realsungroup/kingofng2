import { Component, OnInit, AfterContentInit } from '@angular/core';
import { BaseComponent } from '../base-component/base.component';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from './main.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent extends BaseComponent implements OnInit, AfterContentInit {

  breadcrumbArr: Array<any>;
  isCollapsed = false;
  routerArr: any;

  constructor(protected router: Router, private route: ActivatedRoute, private mainSev: MainService) {
    super();

    let routeJson = localStorage.getItem("routerJson");
    let routeArr = JSON.parse(routeJson);

    this.fixR(routeArr, 6);
  }

  fixR(routeArr: any, cl: number) {
    if (cl <= 0) {
      this.routerArr = routeArr[0].children;
      return;
    }

    let filterArr = routeArr.filter(v => v.class == cl);
    let fixRouteArr = routeArr.filter(v => v.class != cl);
    for (let r of filterArr) {
      for (let fr of fixRouteArr) {
        if (r.parent && r.parent.length && r.parent == fr.path) {
          if (fr.children && Array.isArray(fr.children)) fr.children.push(r);
          else fr.children = [r];
          // break;
        }
      }
    }
    this.fixR(fixRouteArr, cl - 1);
  }

  ngOnInit() {
    this.mainSev.getBreadArr().subscribe(
      (data: Array<any>) => {
        this.breadcrumbArr = data;
        // alert(JSON.stringify(data));
      }
    )
  }

  ngAfterContentInit() {
    // var liArr = document.getElementsByTagName("li");
    // for (var i = 0; i < liArr.length; i++) {
    //   var li = liArr[i];
    //   window.addEventListener("click", function (event) {
    //     event.stopPropagation();
    //     event.preventDefault();
    //   })
    // }
  }

}
