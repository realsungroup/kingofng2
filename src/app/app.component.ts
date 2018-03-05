import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {

  title = 'app works!';
  constructor() {
   

    document.onkeypress = function () {
      if ((<any>event).keyCode == 13) {
        return false;
      }
    }
  }


}