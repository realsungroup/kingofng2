import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuOrderStatisticsComponent } from './menu-order-statistics.component';

describe('MenuOrderStatisticsComponent', () => {
  let component: MenuOrderStatisticsComponent;
  let fixture: ComponentFixture<MenuOrderStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuOrderStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuOrderStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
