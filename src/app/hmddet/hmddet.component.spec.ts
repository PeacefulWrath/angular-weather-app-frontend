
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HmddetComponent } from './hmddet.component';

describe('HmddetComponent', () => {
  let component: HmddetComponent;
  let fixture: ComponentFixture<HmddetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HmddetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HmddetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
