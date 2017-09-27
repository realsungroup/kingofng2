import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierBalanceTableComponent } from './supplier-balance-table.component';

describe('SupplierBalanceTableComponent', () => {
  let component: SupplierBalanceTableComponent;
  let fixture: ComponentFixture<SupplierBalanceTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierBalanceTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierBalanceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
