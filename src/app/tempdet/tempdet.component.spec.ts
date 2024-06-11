import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempdetComponent } from './tempdet.component';

describe('TempdetComponent', () => {
  let component: TempdetComponent;
  let fixture: ComponentFixture<TempdetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TempdetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TempdetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
