import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkGeneratedComponent } from './link-generated.component';

describe('LinkGeneratedComponent', () => {
  let component: LinkGeneratedComponent;
  let fixture: ComponentFixture<LinkGeneratedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkGeneratedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkGeneratedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
