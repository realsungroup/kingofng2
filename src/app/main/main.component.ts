import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BaseComponent } from '../base-component/base.component';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from './main.service';
import { Subject } from 'rxjs/Subject';
import { AppService } from '../app.service';
import { BaseHttpService } from '../base-http-service/base-http.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})

export class MainComponent implements OnInit, AfterViewInit {

  breadcrumbArr: Array<any> = [];
  isCollapsed = false;
  routerArr: any;
  _siderHeight: number = 0;
  constructor(protected router: Router,
    private route: ActivatedRoute,
    private mainSev: MainService,
    private appSev: AppService,
    private httpSev: BaseHttpService) {

  }

  ngOnInit() { }

  ngAfterViewInit() {
    this._siderHeight = window.innerHeight;
    let routeArr = window.app["routesArr"];
    setTimeout(() => {
      this.routerArr = this.mainSev.fixRouteData(routeArr, 6);
      let a = []
      for (let i = 0; i < 20; i++) a.push(this.routerArr[1]);
      // this.routerArr = a;
    }, 200);

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

  //登出
  loginOutClick() {
    this.router.navigate(['/login']);
    window.app["routesArr"] = [];
    window.app["badgeNo"] = '';
    window.app["userInfo"] = {};
    this.httpSev.updateAppConfig();
  }

  onResize() {
    this._siderHeight = window.innerHeight;
  }

  ChangePassWord() {
    this.router.navigate(['/ChangeWord'])

  }

}
