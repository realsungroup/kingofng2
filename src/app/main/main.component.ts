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

export class MainComponent extends BaseComponent implements OnInit, AfterViewInit {

  breadcrumbArr: Array<any>;
  isCollapsed = false;
  routerArr: any;

  constructor(protected router: Router,
    private route: ActivatedRoute,
    private mainSev: MainService,
    private appSev: AppService) {
    super();

  }

  ngOnInit() {
    let routeArr = this.appSev.getAppConfig()["routesArr"];
    this.routerArr = this.mainSev.fixRouteData(routeArr, 6);

    this.mainSev.getBreadArr().subscribe(
      (data: Array<any>) => {
        this.breadcrumbArr = data;
      }
    )
  }


  ngAfterViewInit() {
    setTimeout(() => {
    }, 100);
  }

  toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }
  
}
