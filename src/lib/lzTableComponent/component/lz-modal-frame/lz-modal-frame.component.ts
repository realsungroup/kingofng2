import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { trigger,state,style,animate,transition } from '@angular/animations';

@Component({
  selector: 'lz-modal-frame',
  templateUrl: './lz-modal-frame.component.html',
  styleUrls: ['./lz-modal-frame.component.scss'],
  animations:[
    trigger('host',[
      state('void',style({
        opacity:0
      })),
      transition(':enter',[
        animate(300,style({opacity : 1}))
      ])
    ])
  ]
})
export class LzModalFrameComponent implements OnInit {

  @Input() closeBtn = false;
  @Input() width = 600;
  @Output() closeEM = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  close(){
    this.closeEM.emit();
  }

}
