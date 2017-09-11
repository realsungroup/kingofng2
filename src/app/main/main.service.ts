import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MainService {

  breadArr = new Subject();

  constructor() { }

  getBreadArr(){
    return this.breadArr;
  }

  updateBreadArr(data:any){
    this.breadArr.next(data);
  }
}
