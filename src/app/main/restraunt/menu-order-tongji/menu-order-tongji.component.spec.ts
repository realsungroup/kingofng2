import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuOrderTongjiComponent } from './menu-order-tongji.component';

describe('MenuOrderStatisticsComponent', () => {
  let component: MenuOrderTongjiComponent;
  let fixture: ComponentFixture<MenuOrderTongjiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuOrderTongjiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuOrderTongjiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
