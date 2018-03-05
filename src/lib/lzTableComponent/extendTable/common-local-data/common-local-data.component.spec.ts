import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonLocalDataComponent } from './common-local-data.component';

describe('CommonLocalDataComponent', () => {
  let component: CommonLocalDataComponent;
  let fixture: ComponentFixture<CommonLocalDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonLocalDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonLocalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
