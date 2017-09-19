import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BaseComponent } from '../base-component/base.component';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from './main.service';
import { Subject } from 'rxjs/Subject';
import { AppService } from '../app.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit, AfterViewInit {

  breadcrumbArr: Array<any> = [];
  isCollapsed = false;
  routerArr: any;

  constructor(protected router: Router,
    private route: ActivatedRoute,
    private mainSev: MainService,
    private appSev: AppService) {

  }

  ngOnInit() { }

  ngAfterViewInit() {
    let routeArr = this.appSev.getAppConfig()["routesArr"];
    setTimeout(() => {
      this.routerArr = this.mainSev.fixRouteData(routeArr, 6);
      let a = []
      for(let i = 0 ; i < 20 ; i++) a.push(this.routerArr[1]);
      // this.routerArr = a;
    },200);
    this.mainSev.getBreadArr().subscribe(
      (data: Array<any>) => {
        setTimeout(() => {
          this.breadcrumbArr = data;
        });
      }
    )
  }

  toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }

}
