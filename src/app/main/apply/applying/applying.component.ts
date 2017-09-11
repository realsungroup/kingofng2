import { Component, OnInit } from '@angular/core';
import { ApplyingService } from './applying.service';
import { Subject } from 'rxjs/Subject';
import { MainService } from '../../main.service';

@Component({
  selector: 'app-applying',
  templateUrl: './applying.component.html',
  styleUrls: ['./applying.component.scss']
})
export class ApplyingComponent implements OnInit {
  _current = 1;
  _pageSize = 2;
  _total = 1;
  _dataSet = [];
  _loading = true;

  constructor(private _applyingSev: ApplyingService,private mainSev:MainService) {
  }

  _refreshData = () => {
    // this._loading = true;
    // this._randomUser.getUsers(this._current, this._pageSize).subscribe((data: any) => {
    //   this._loading = false;
    //   this._total = 200;
    //   this._dataSet = data.results;
    // })
    this._loading = true;
    this._applyingSev.getApplyingData("", this._current,this._pageSize).subscribe(
      (data: any) => {
        if (data && data.data) {
          let dataArr = data.data;
          this._loading = false;
          this._total = data["total"];
          this._dataSet = dataArr;
          console.log("getApplyingData" + JSON.stringify(data))
        }
      }
    )
  };

  ngOnInit() {
        this.mainSev.updateBreadArr([
      {
        title: "main"
      }, {
        title: "applying"
      }
    ])

    this._refreshData();
  }

}
