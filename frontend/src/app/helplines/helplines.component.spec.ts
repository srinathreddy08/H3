import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelplinesComponent } from './helplines.component';

describe('HelplinesComponent', () => {
  let component: HelplinesComponent;
  let fixture: ComponentFixture<HelplinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelplinesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelplinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
