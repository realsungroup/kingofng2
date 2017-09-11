import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';
  constructor() {
    console.log(JSON.stringify(window.navigator.userAgent));

    console.info(window.navigator);


  }


}