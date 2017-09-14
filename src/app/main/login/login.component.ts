import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base-component/base.component';
import { Router, RouterModule, Routes, ActivatedRoute, ParamMap } from '@angular/router';
import { TestComponent } from '../test/test.component';
import { LoginService } from './login.service';
import { LoginInterface } from './login.interface';
import { AppService } from '../../app.service';
import { Observable } from 'rxjs';

interface MyRoute {
  title: string;
  link: string;
  children: Array<MyRoute>
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent extends BaseComponent implements OnInit {
  isLoginWithToken: boolean = false;

  loginM: LoginInterface = {
    account: "",
    passWord: ""
  };

  constructor(private router: Router,
    private loginSve: LoginService,
    private appSve: AppService,
    private route: ActivatedRoute) {
    super();

    this.route.queryParams.subscribe(
      data => {
        // alert(JSON.stringify(data));
        let path = data.path;
        let ucode = data.ucode;
        let badgeno = data.badgeno;

        if (path) {
          this.isLoginWithToken = true;

          this.loginWithToken(badgeno, ucode);
          this.navigateWithPath(path);
        }

      },
      err => {

      }
    )
  }

  loginWithToken(badgeno: string, token: string) {
    let params = {
      account:badgeno,//'80881',
      ucode:token//'GHgfPHoXCQno+l0KaDrIOg=='
    }
    this.loginSve.login('badgenodynamic',params).subscribe(
      data => {
        alert("badgenodynamic success" + JSON.stringify(data));
      },
      err => {
        alert("badgenodynamic error" + JSON.stringify(err));
      },
      () => {
        alert("badgenodynamic complete");
      }
    )
  }

  navigateWithPath(path: string) {
    this.router.navigate(['/' + path])
  }

  ngOnInit() {
    // this.getRouteData();
  }

  getRouteData() {
  }

  loginClick() {
    let params = {
      // account:'80881',
      account:'001'
    }
    this.loginSve.login('',params).subscribe(
      data => {
        console.log("login success" + JSON.stringify(data));

        if (data['OpResult'] != 'Y') { alert(data['ErrorMsg']); return }

        this.appSve.addProperty("userInfo", data);
        this.loginSve.getTeamApprove();

        // 
        Observable.forkJoin(this.loginSve.getVacationCategory(), this.loginSve.getRefuseData(),this.loginSve.getRouteData()).subscribe(
          data => {
            this.router.navigate(["/main"]);
            console.log("all success" + JSON.stringify(data));
          },
          err => {
            console.log("some or all err" + JSON.stringify(err));
          },
          () => {
            console.log("all complete");
          })
      },
      err => {
        alert("login fail");
      }
    )
  }


}
