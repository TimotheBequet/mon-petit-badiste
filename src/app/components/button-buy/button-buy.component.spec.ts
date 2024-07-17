import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonBuyComponent } from './button-buy.component';

describe('ButtonBuyComponent', () => {
  let component: ButtonBuyComponent;
  let fixture: ComponentFixture<ButtonBuyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonBuyComponent]
    });
    fixture = TestBed.createComponent(ButtonBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
