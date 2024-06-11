import { ComponentFixture, TestBed } from '@angular/core/testing';

import {  RaindetComponent } from './raindet.component';

describe('RaindetComponent', () => {
  let component: RaindetComponent;
  let fixture: ComponentFixture<RaindetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RaindetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RaindetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
