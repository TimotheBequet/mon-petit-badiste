import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonMoveComponent } from './button-move.component';

describe('ButtonMoveComponent', () => {
  let component: ButtonMoveComponent;
  let fixture: ComponentFixture<ButtonMoveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonMoveComponent]
    });
    fixture = TestBed.createComponent(ButtonMoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
