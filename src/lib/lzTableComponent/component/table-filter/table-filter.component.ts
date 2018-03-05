import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss']
})
export class TableFilterComponent implements OnInit {
  _data = [];
  _copyData = [];
  sortMap = {};
  filterArrayMap = {}
  sortName = null;
  sortValue = null;
  @Input() set copyData(value) {
    this._copyData = value;
    this.setFilterArrayMap()
  }
  @Input() titleID = '';
  _filterColArr = [];
  @Input() set filterColArr(value) {
    this._filterColArr = value;
    this.setFilterArrayMap()
  }
  _sortColArr = [];
  @Input() set sortColArr(value) {
    this._sortColArr = value;
    this._sortColArr.forEach(col => {
      this.sortMap[col] = null
    });
  };
  @Output() updateDataEM = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  setFilterArrayMap() {
    if (this._copyData.length && this._filterColArr.length) {
      this._filterColArr.forEach(col => {
        this.filterArrayMap[col] = this.getFilterArrData(this._copyData, col);
      })
    }
  }

  sort(sortName, value) {
    this.sortName = sortName;
    this.sortValue = value;
    Object.keys(this.sortMap).forEach(key => {
      if (key !== sortName) {
        this.sortMap[key] = null;
      } else {
        this.sortMap[key] = value;
      }
    });
    this.search();
  }

  search() {
    let filterFunc = (item) => {
      let bool = false;
      for (var i = 0; i < this._filterColArr.length; i++) {
        let col = this._filterColArr[i];
        let searchName = this.filterArrayMap[col].filter(name => name.value);
        let itemBool = (searchName.length ? searchName.some(name => (item[col] + '').indexOf(name.name) !== -1) : true)
        if (!i) bool = itemBool;
        else bool = bool && itemBool;
      }
      return bool;
    };

    this._data = [...this._copyData.filter(item => filterFunc(item))];
    this._data = [...this._data.sort((a, b) => {
      if (a[this.sortName] > b[this.sortName]) {
        return (this.sortValue === 'ascend') ? 1 : -1;
      } else if (a[this.sortName] < b[this.sortName]) {
        return (this.sortValue === 'ascend') ? -1 : 1;
      } else {
        return 0;
      }
    })];
    this.updateDataEM.emit(this._data);
  }

  reset(array) {
    array.forEach(item => {
      item.value = false;
    });
    this.search();
  }


  getFilterArrData(data: any, key: string): Array<any> {
    let dataMap = {};
    for (var value of data) {
      let obj = {
        name: value[key],
        value: false
      };
      dataMap[obj.name] = obj;
    }
    return this.getObjectValues(dataMap);
  }

  getObjectValues(obj){
    let valuesArr = [];
    for(var key in obj){
      valuesArr.push(obj[key]);
    }
    return valuesArr;
  }
}
