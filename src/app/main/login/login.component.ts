import { Component, OnInit,Injector } from '@angular/core';
import { BaseComponent } from '../../base-component/base.component';
import { Router, RouterModule, Routes, ActivatedRoute, ParamMap } from '@angular/router';
import { LoginService } from './login.service';
import { LoginInterface } from './login.interface';
import { AppService } from '../../app.service';
import { Observable } from 'rxjs';
import { MainService } from '../main.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  validateForm: FormGroup;
  loginM: LoginInterface = {
    account: "",
    passWord: ""
  };

  constructor(protected injector: Injector,
    private loginSve: LoginService,
    private route: ActivatedRoute,
    private fb: FormBuilder) {
    super(injector);

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
      account: badgeno,//'80881',
      ucode: token//'GHgfPHoXCQno+l0KaDrIOg=='
    }
    this.loginSve.login('badgenodynamic', params).subscribe(
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
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }

  getRouteData() {

  }

  _submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
    }

    let params = {
      // account:'80881',
      account: '001'
    }
    this.loginSve.login('', params).subscribe(
      data => {
        console.log("login success" + JSON.stringify(data));

        if (data['OpResult'] != 'Y') { alert(data['ErrorMsg']); return }

        window.app["userInfo"] = data;

        this.loginSve.getRouteData().subscribe(
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
