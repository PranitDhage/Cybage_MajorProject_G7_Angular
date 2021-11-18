import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSecondComponent } from './game-second.component';

describe('GameSecondComponent', () => {
  let component: GameSecondComponent;
  let fixture: ComponentFixture<GameSecondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameSecondComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
