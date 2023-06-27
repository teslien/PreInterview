import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunningQuizComponent } from './running-quiz.component';

describe('RunningQuizComponent', () => {
  let component: RunningQuizComponent;
  let fixture: ComponentFixture<RunningQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RunningQuizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RunningQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
