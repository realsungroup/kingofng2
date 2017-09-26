import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyBalanceTableComponent } from './company-balance-table.component';

describe('CompanyBalanceTableComponent', () => {
  let component: CompanyBalanceTableComponent;
  let fixture: ComponentFixture<CompanyBalanceTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyBalanceTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyBalanceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
