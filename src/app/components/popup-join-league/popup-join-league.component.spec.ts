import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupJoinLeagueComponent } from './popup-join-league.component';

describe('PopupJoinLeagueComponent', () => {
  let component: PopupJoinLeagueComponent;
  let fixture: ComponentFixture<PopupJoinLeagueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupJoinLeagueComponent]
    });
    fixture = TestBed.createComponent(PopupJoinLeagueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
