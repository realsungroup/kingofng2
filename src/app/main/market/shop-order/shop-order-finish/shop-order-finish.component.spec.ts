/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

import { ShopOrderFinishComponent } from "./shop-order-finish.component";

describe("ShopOrderFinishComponent", () => {
  let component: ShopOrderFinishComponent;
  let fixture: ComponentFixture<ShopOrderFinishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShopOrderFinishComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopOrderFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
