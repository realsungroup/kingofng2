import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MainService {

  breadArr = new Subject();

  constructor() { }

  getBreadArr() {
    return this.breadArr;
  }

  updateBreadArr(data: any) {
    this.breadArr.next(data);
  }

  fixRouteData(routeArr: any, cl?: number) {
    if(!Array.isArray(routeArr)) return [];
    routeArr = routeArr.filter(item => item['C3_558541943043'] != 'clearCache');
    if (!cl) cl = 6;
    while (cl > 0) {
      let filterArr = routeArr.filter(v => v.C3_558541903900 == cl);
      let fixRouteArr = routeArr.filter(v => v.C3_558541903900 != cl);
      for (let r of filterArr) {
        for (let fr of fixRouteArr) {
          if (r.C3_558541922352 && r.C3_558541922352.length && r.C3_558541922352 == fr.C3_558541943043) {
            if (fr.children && Array.isArray(fr.children)) fr.children.push(r);
            else fr.children = [r];
          }
        }
      }
      routeArr = fixRouteArr;
      cl--;
    }

    return routeArr;
  }

  setBreadDataWithUrl(routeArr:Array<any>,url: string) {
    if(!Array.isArray(routeArr)) return;
    let r:any = routeArr.filter(item => item.C3_558541978410 == url)[0] || {};
    let rp:any;

    let routeTitleArr = [{title:r.C3_558541955195}];
    while(r && r.C3_558541922352){
       let rp = routeArr.filter(item => r.C3_558541922352 == item.C3_558541943043)[0];
       r = rp;
      routeTitleArr.unshift({
        title:r.C3_558541955195
      })
    }
    this.updateBreadArr(routeTitleArr);
  }

}
