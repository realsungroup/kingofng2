import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'table-thead,[table-thead]',
    templateUrl: './table-thead.html'
})

export class TableTheadComponent {
    @Input() titleArr = [];
    @Input() copyData = [];
    @Input() filterColArr = [];
    @Input() sortColArr = [];
    @Output() updateDataEM = new EventEmitter();

    tableFilterUpdateData(data) {
        this.updateDataEM.emit(data);
    }


}