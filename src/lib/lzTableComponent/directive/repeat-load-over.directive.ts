import { Directive,OnInit,ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appRepeatLoadOver]'
})
export class RepeatLoadOverDirective implements OnInit {

  @Input('appRepeatLoadOver') params = [];

  constructor(private _el:ElementRef) { }

  ngOnInit(){
    if(this.params[1] && typeof(this.params[0]) == 'function'){
      this.params[0]();
    }
  }

}
