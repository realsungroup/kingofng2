import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestrauntOrderComponent } from './restraunt-order.component';

describe('RestrauntOrderComponent', () => {
  let component: RestrauntOrderComponent;
  let fixture: ComponentFixture<RestrauntOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestrauntOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestrauntOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
