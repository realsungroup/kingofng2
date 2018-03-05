/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LZcommonTableComponent } from './lzcommon-table.component';

describe('LZcommonTableComponent', () => {
  let component: LZcommonTableComponent;
  let fixture: ComponentFixture<LZcommonTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LZcommonTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LZcommonTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
