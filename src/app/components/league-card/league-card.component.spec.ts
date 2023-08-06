import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueCardComponent } from './league-card.component';

describe('LeagueCardComponent', () => {
  let component: LeagueCardComponent;
  let fixture: ComponentFixture<LeagueCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeagueCardComponent]
    });
    fixture = TestBed.createComponent(LeagueCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
