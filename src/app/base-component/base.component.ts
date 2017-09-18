import { Component, OnInit } from '@angular/core';
import { MainService } from '../main/main.service';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base',
  template:''
})
export class BaseComponent implements OnInit {

  constructor(protected mainSev:MainService,protected appSev:AppService,protected router:Router) { 
  }

  ngOnInit() {
    this.mainSev.setBreadDataWithUrl(this.appSev.getAppConfig()["routesArr"], this.router.url);
   }

}
