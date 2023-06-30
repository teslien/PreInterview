import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoVerificationComponent } from './photo-verification.component';

describe('PhotoVerificationComponent', () => {
  let component: PhotoVerificationComponent;
  let fixture: ComponentFixture<PhotoVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoVerificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
