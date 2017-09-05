import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { LoginComponent } from './login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginService } from './login.service';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  declarations: [LoginComponent],
  entryComponents:[],
  providers:[LoginService],
  exports:[LoginComponent]
})
export class LoginModule { }
