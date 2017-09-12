import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { MainService } from '../main.service';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  title:string;

  @Output() passMessage = new EventEmitter();

  constructor(private router:Router,
    private actRoute:ActivatedRoute,
    private mainSev:MainService,
    private appSev:AppService) {
    this.title = this.router.url;

    this.mainSev.setBreadDataWithUrl(this.appSev.getAppConfig()["routesArr"],this.router.url);

    this.passMessage.emit(this.router.url);
   }

  ngOnInit() {
  }

}
