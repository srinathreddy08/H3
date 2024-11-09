import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellnessServiceComponent } from './wellness-service.component';

describe('WellnessServiceComponent', () => {
  let component: WellnessServiceComponent;
  let fixture: ComponentFixture<WellnessServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WellnessServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WellnessServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
