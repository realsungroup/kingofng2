import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LzModalFrameComponent } from './lz-modal-frame.component';

describe('LzModalFrameComponent', () => {
  let component: LzModalFrameComponent;
  let fixture: ComponentFixture<LzModalFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LzModalFrameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LzModalFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
