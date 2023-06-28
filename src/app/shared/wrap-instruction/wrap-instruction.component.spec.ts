import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapInstructionComponent } from './wrap-instruction.component';

describe('WrapInstructionComponent', () => {
  let component: WrapInstructionComponent;
  let fixture: ComponentFixture<WrapInstructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrapInstructionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WrapInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
