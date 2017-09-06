import {
  Component,
  Input
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';


@Component({
  selector: 'hero-list-auto',
  template: `
    <ul>
      <li *ngFor="let hero of heroes"
          [@shrinkOut]="'in'">
        {{hero.name}}
      </li>
    </ul>
  `,

  /* When the element leaves (transition "in => void" occurs),
   * get the element's current computed height and animate
   * it down to 0.
   */
  animations: [
    trigger('shrinkOut', [
      state('in', style({height: '*'})),
      transition('* => void', [
        style({height: '*'}),
        animate(250, style({height: 0}))
      ])
    ])
  ]
})
export class HeroListAutoComponent {
  heroes = [{"name":"111"}]
}
