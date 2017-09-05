import { Component, OnInit,AfterContentInit } from '@angular/core';
import { BaseComponent } from '../base-component/base.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent extends BaseComponent implements OnInit,AfterContentInit {

  isCollapsed = false;

  routerArr:any;

  constructor(private router:Router) {
    super();

    // this.routerArr = this.filterRedic(this.router.config)[1]["children"];
    console.log(this.routerArr);

    let routeJson = localStorage.getItem("routerJson");

    let routeArr = JSON.parse(routeJson);

     console.log(this.fixR(routeArr,6));
   }

  //  filterRedic(routes:Array<any>){
  //   return routes.filter( r => {
  //     if (r.children && !!r.children.length) {
  //       r.children = this.filterRedic(r.children);
  //     }
  //     if(!r['pathMatch']) return true;
  //     else return false;
  //   });
  //  }

   fixR(routeArr: any, cl: number) {
    console.log("-->" + JSON.stringify(routeArr));
    if(cl <= 0) return this.routerArr = routeArr[0].children;

    let filterArr = routeArr.filter(v => v.class == cl);
    let fixRouteArr = routeArr.filter(v => v.class != cl);
    for (let r of filterArr) {
      for (let fr of fixRouteArr) {
        if (r.parent && r.parent.length && r.parent == fr.path) {
            if(fr.children && Array.isArray(fr.children)) fr.children.push(r);
            else fr.children = [r];
            break;
          
        } 
      }

    }
    console.log("fixR " + fixRouteArr)
    this.fixR(fixRouteArr,cl - 1);
  }

  ngOnInit() {
  }



  ngAfterContentInit(){
    var liArr = document.getElementsByTagName("li");
    for(var i = 0 ; i  < liArr.length ; i ++){
      var li = liArr[i];
      window.addEventListener("click",function(event){
        event.stopPropagation();  
        event.preventDefault();
        console.log("preventDefault")
      })
    }
  }

  passMessage(data:string){
    alert(data);
  }

}
