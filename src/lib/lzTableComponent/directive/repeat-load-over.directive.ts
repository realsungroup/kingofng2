import { Directive,OnInit,ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appRepeatLoadOver]'
})
export class RepeatLoadOverDirective implements OnInit {

  @Input('appRepeatLoadOver') loadFunc;

  constructor(private _el:ElementRef) { }

  ngOnInit(){
    this.loadFunc();
  }

}
