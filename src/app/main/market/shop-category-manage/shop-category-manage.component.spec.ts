import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCategoryManageComponent } from './shop-category-manage.component';

describe('ShopCategoryManageComponent', () => {
  let component: ShopCategoryManageComponent;
  let fixture: ComponentFixture<ShopCategoryManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopCategoryManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopCategoryManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
