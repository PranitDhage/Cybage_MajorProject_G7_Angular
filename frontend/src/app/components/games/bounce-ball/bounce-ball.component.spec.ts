import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BounceBallComponent } from './bounce-ball.component';

describe('BounceBallComponent', () => {
  let component: BounceBallComponent;
  let fixture: ComponentFixture<BounceBallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BounceBallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BounceBallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
