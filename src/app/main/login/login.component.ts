import { Component, OnInit, Injector ,Optional } from '@angular/core';
import { BaseComponent } from '../../base-component/base.component';
import { Router, RouterModule, Routes, ActivatedRoute, ParamMap } from '@angular/router';
import { LoginService } from './login.service';
import { LoginInterface } from './login.interface';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';

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
  _loginBtnLoading = false;
  loginM: LoginInterface = {
    account: "",
    passWord: "",
  };

  constructor(protected injector: Injector,
    private loginSve: LoginService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private messageSev: NzMessageService) {
    super(injector);

    this.route.queryParams.subscribe(
      data => {
        // alert(JSON.stringify(data));
        let path = data.path;
        let ucode = data.ucode;
        let account = data.account;
        let loginMethod = data.loginMethod;

        if (path && ucode && account && loginMethod) {
          this.isLoginWithToken = true;
          this.loginWithToken(account, ucode,loginMethod, path);
        }

      },
      err => {

      }
    )
  }

  loginWithToken(badgeno: string, token: string,loginMethod:string, path: string) {
    let params: LoginInterface = {
      account: badgeno,//'80881',
      passWord: token//'GHgfPHoXCQno+l0KaDrIOg=='
    }
    this.loginSve.login(loginMethod, params).subscribe(
      data => {
        // alert("badgenodynamic success" + JSON.stringify(data));
        this.loginSuccessDeal(data, path);
      },
      err => {
        this.messageSev.error('登录错误，错误信息：' + JSON.stringify(err));
      },
      () => {

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

  _submitForm() {
    this._loginBtnLoading = true;
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
    }

    this.loginSve.login('default', this.loginM).subscribe(
      data => {
        this.loginSuccessDeal(data, 'main');
      },
      err => {
        this.messageSev.error("登录错误");
      },
      () => {
        this._loginBtnLoading = false;
      }
    )
  }

  loginSuccessDeal(data: any, path: string) {
    if (data['OpResult'] != 'Y') {
       this.messageSev.error(data['ErrorMsg']); 
       return;
    }
    window.app["userInfo"] = data;
    this.loginSve.getRouteData().subscribe(
      data => {
        this.navigateWithPath(path);
      },
      err => {
        this.messageSev.error("获取路由错误，错误信息：" + JSON.stringify(err));
      })
  }
ChangePassWord(){
  this.router.navigate(['/ChangeWord'])

  
}
}
