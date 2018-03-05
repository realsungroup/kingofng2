/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormItemDynamicComponent } from './form-item-dynamic.component';

describe('FormItemDynamicComponent', () => {
  let component: FormItemDynamicComponent;
  let fixture: ComponentFixture<FormItemDynamicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormItemDynamicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormItemDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect("FormItemDynamicComponent" + component.title.FrmReadonly);
  });

  // it('shou')
});
