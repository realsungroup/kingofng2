import { Component, OnInit,Input,EventEmitter,Output } from '@angular/core';

@Component({
  selector: 'app-confirm-alert',
  templateUrl: './confirm-alert.component.html',
  styleUrls: ['./confirm-alert.component.scss']
})
export class ConfirmAlertComponent implements OnInit {

  isVisible = false;
  @Input() title:string = '提示';
  @Input() content:string = '';
  data:any = {};
  @Output() clickNotiEvent = new EventEmitter();

  handleOk = (e) => {
    console.log('点击了确定');
    this.isVisible = false;
    this.clickNotiEvent.emit(this.data);
  }

  handleCancel = (e) => {
    console.log(e);
    this.isVisible = false;
  }
  constructor() { }

  ngOnInit() {

  }

}
