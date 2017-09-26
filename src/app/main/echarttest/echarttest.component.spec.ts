import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcharttestComponent } from './echarttest.component';

describe('EcharttestComponent', () => {
  let component: EcharttestComponent;
  let fixture: ComponentFixture<EcharttestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcharttestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcharttestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
