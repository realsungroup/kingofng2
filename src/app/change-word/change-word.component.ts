import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { LoginService } from '../main/login/login.service';
import { BaseComponent } from '../base-component/base.component';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BaseHttpService } from '../base-http-service/base-http.service';

@Component({
  selector: 'app-change-word',
  templateUrl: './change-word.component.html',
  styleUrls: ['./change-word.component.scss']
})
export class ChangeWordComponent implements OnInit {
 

  oldPassWord = '';
  passWord = '';
  surePassWord = ''

  constructor(private router: Router, private httpSer: BaseHttpService, private nzMessageSer:NzMessageService) { }

  ngOnInit() {

  }
  Goback() {
    this.router.navigate(['/main'])
  }
  CheckPassword() {
    let passwordValiate = this.confirmPassWord(this.passWord,this.surePassWord);
    if(!passwordValiate) return;

    let params = {
      'OldPass': this.oldPassWord,
      'NewPass1': this.passWord
    }
    const url = this.httpSer.path.baseUrl + this.httpSer.path.changePassWrod;

    this.httpSer.baseRequest("POST", url, params, this.httpSer.dataT.UnKnow).subscribe(
      data => {
        if(data && (data.error == 0 || data.Error == 0)){
          this.nzMessageSer.success(data.message || '修改成功')
        }else this.nzMessageSer.success(data.message || '修改失败')
       // console.info("CheckPassword", data)
      },
      error => {
        this.nzMessageSer.error('修改错误')
      }
    )
  }

  confirmPassWord(newPW, sureNewPW) {
    if (!newPW.length && !sureNewPW.length) {
      this.nzMessageSer.error("请输入新密码！");
      return false;
    }

    if (newPW == sureNewPW) {
      return true;
    } else {
      this.nzMessageSer.error("两次输入的密码不一致！");
      return false;
    }
  }




}
