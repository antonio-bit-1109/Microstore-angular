import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrelliComponent } from './carrelli.component';

describe('CarrelliComponent', () => {
  let component: CarrelliComponent;
  let fixture: ComponentFixture<CarrelliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarrelliComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarrelliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
